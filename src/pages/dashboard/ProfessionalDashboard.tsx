import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import FormField from "../../components/FormField";
import type { ConsultaResponse, ConsultaStatus, DisponibilidadeResponse } from "../../services/api";
import {
  createDisponibilidade,
  deleteDisponibilidade,
  getConsultasByProfissional,
  getDisponibilidades,
  updateConsultaStatus,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { buildDateRange, formatDateTime } from "../../utils/dateHelpers";

const statusOptions = [
  { value: "AGENDADA", label: "Agendada" },
  { value: "REALIZADA", label: "Realizada" },
  { value: "CANCELADA", label: "Cancelada" },
  { value: "FALTOU", label: "Faltou" },
];

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const profissionalId = user?.profissionalId;
  const [{ start, end }, setRange] = useState(() => buildDateRange(14));
  const [slots, setSlots] = useState<DisponibilidadeResponse[]>([]);
  const [consultas, setConsultas] = useState<ConsultaResponse[]>([]);
  const [novoSlot, setNovoSlot] = useState("");
  const [feedback, setFeedback] = useState({ error: "", success: "" });
  const [showRefreshHint, setShowRefreshHint] = useState(true);

  useEffect(() => {
    if (!profissionalId) return;
    const loadAll = async () => {
      try {
        const [disponibilidades, consultasResponse] = await Promise.all([
          getDisponibilidades({ profissionalId, dataInicial: start, dataFinal: end }),
          getConsultasByProfissional(profissionalId),
        ]);
        setSlots(disponibilidades || []);
        setConsultas(consultasResponse || []);
      } catch (error: any) {
        setFeedback({ error: error.message || "Erro ao carregar agenda.", success: "" });
      }
    };
    loadAll();
  }, [profissionalId, start, end]);

  const handleNovoSlot = async (event: FormEvent) => {
    event.preventDefault();
    if (!profissionalId || !novoSlot) return;
    try {
      await createDisponibilidade({ profissionalId, dataHora: novoSlot });
      setNovoSlot("");
      const data = await getDisponibilidades({ profissionalId, dataInicial: start, dataFinal: end });
      setSlots(data || []);
      setFeedback({ error: "", success: "Disponibilidade criada com sucesso!" });
    } catch (error: any) {
      setFeedback({ error: error.message || "Erro ao cadastrar disponibilidade.", success: "" });
    }
  };

  const handleExcluirSlot = async (id: number) => {
    if (!window.confirm("Remover o horário livre?")) return;
    try {
      await deleteDisponibilidade(id);
      setSlots((prev) => prev.filter((slot) => slot.id !== id));
    } catch (error: any) {
      setFeedback({ error: error.message || "Erro ao remover slot.", success: "" });
    }
  };

  const handleStatusChange = async (consultaId: number, status: ConsultaStatus) => {
    try {
      await updateConsultaStatus(consultaId, { status });
      const data = await getConsultasByProfissional(profissionalId!);
      setConsultas(data || []);
    } catch (error: any) {
      setFeedback({ error: error.message || "Erro ao atualizar status.", success: "" });
    }
  };

  if (!profissionalId)
    return (
      <p className="p-6 text-center text-red-600">
        Faça login como profissional para acessar o painel.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 animate-fadeIn">
      <div className="mx-auto max-w-6xl space-y-8">
        {showRefreshHint && (
          <div className="flex items-start justify-between rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 shadow">
            <p>
              Se a agenda não carregar ou aparecer “Não autenticado”, atualize a página para
              restaurar a sessão.
            </p>
            <button
              onClick={() => setShowRefreshHint(false)}
              className="ml-4 text-xs font-semibold uppercase text-amber-700"
            >
              Entendi
            </button>
          </div>
        )}

        {/* Disponibilidades */}
        <section className="rounded-xl border bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-primary mb-4">Gerenciar agenda</h1>
          <form className="grid gap-4 md:grid-cols-3 mb-6" onSubmit={handleNovoSlot}>
            <FormField label="De" name="rangeStart" type="date" value={start} />
            <FormField label="Até" name="rangeEnd" type="date" value={end} />
            <FormField
              label="Novo horário"
              name="novoSlot"
              type="datetime-local"
              value={novoSlot}
              onChange={(e) => setNovoSlot(e.target.value)}
              required
            />
            <div className="md:col-span-3">
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2 text-white font-semibold hover:bg-secondary transition"
              >
                Adicionar disponibilidade
              </button>
            </div>
          </form>
          <Table
            columns={[{ header: "Horário", accessor: "dataHora", render: (v) => formatDateTime(v) }]}
            data={slots}
            renderActions={(row) => (
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleExcluirSlot(row.id)}
              >
                Remover
              </button>
            )}
          />
        </section>

        {/* Consultas marcadas */}
        <section className="rounded-xl border bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-primary mb-3">Consultas agendadas</h2>
          <Table
            columns={[
              { header: "Paciente", accessor: "pacienteNome" },
              { header: "Horário", accessor: "dataHora", render: (v) => formatDateTime(v) },
              {
                header: "Link",
                accessor: "linkAcesso",
                render: (v) =>
                  v ? (
                    <a href={v} target="_blank" className="text-blue-600 hover:underline">
                      Abrir reunião
                    </a>
                  ) : (
                    "—"
                  ),
              },
              { header: "Status", accessor: "status" },
            ]}
            data={consultas}
            renderActions={(row) => (
              <div className="flex flex-col gap-2 text-xs">
                <select
                  className="rounded border border-slate-300 px-2 py-1"
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value as ConsultaStatus)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => navigate(`/consultas/${row.id}`)}
                >
                  Detalhes
                </button>
              </div>
            )}
          />
        </section>

        {feedback.error && <p className="text-red-600">{feedback.error}</p>}
        {feedback.success && <p className="text-emerald-600">{feedback.success}</p>}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
