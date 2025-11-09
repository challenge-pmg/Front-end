import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import FormField from "../../components/FormField";
import type {
  ConsultaResponse,
  DisponibilidadeResponse,
  ProfissionalResponse,
} from "../../services/api";
import {
  createConsulta,
  getConsultasByPaciente,
  getDisponibilidades,
  getProfissionais,
  updateConsultaStatus,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { buildDateRange, formatDateTime } from "../../utils/dateHelpers";

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profissionais, setProfissionais] = useState<ProfissionalResponse[]>([]);
  const [selectedProfissional, setSelectedProfissional] = useState("");
  const [{ start, end }, setRange] = useState(() => buildDateRange(7));
  const [disponibilidades, setDisponibilidades] = useState<DisponibilidadeResponse[]>([]);
  const [consultas, setConsultas] = useState<ConsultaResponse[]>([]);
  const [slotSelecionado, setSlotSelecionado] = useState<DisponibilidadeResponse | null>(null);
  const [tipoConsulta, setTipoConsulta] = useState("PRESENCIAL");
  const [feedback, setFeedback] = useState({ error: "", success: "" });
  const [showRefreshHint, setShowRefreshHint] = useState(true);
  const pacienteId = user?.pacienteId;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProfissionais();
        setProfissionais(data || []);
        if (data?.length) setSelectedProfissional(String(data[0].id));
      } catch (error: any) {
        setFeedback({ error: error.message || "Erro ao carregar profissionais.", success: "" });
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!pacienteId) return;
    const loadConsultas = async () => {
      try {
        const data = await getConsultasByPaciente(pacienteId);
        setConsultas(data || []);
      } catch (error: any) {
        setFeedback({ error: error.message || "Erro ao carregar consultas.", success: "" });
      }
    };
    loadConsultas();
  }, [pacienteId]);

  useEffect(() => {
    if (!selectedProfissional) return;
    const loadSlots = async () => {
      try {
        const response = await getDisponibilidades({
          profissionalId: selectedProfissional,
          dataInicial: start,
          dataFinal: end,
        });
        setDisponibilidades(response || []);
      } catch (error: any) {
        setFeedback({ error: error.message || "Erro ao carregar disponibilidades.", success: "" });
      }
    };
    loadSlots();
  }, [selectedProfissional, start, end]);

  const handleRangeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inicio = (e.currentTarget.elements.namedItem("inicio") as HTMLInputElement).value;
    const fim = (e.currentTarget.elements.namedItem("fim") as HTMLInputElement).value;
    if (inicio && fim) setRange({ start: inicio, end: fim });
  };

  const handleAgendar = async (e: FormEvent) => {
    e.preventDefault();
    if (!pacienteId || !slotSelecionado) return;
    try {
      await createConsulta({
        pacienteId,
        profissionalId: slotSelecionado.profissionalId,
        disponibilidadeId: slotSelecionado.id,
        tipoConsulta,
      });
      setSlotSelecionado(null);
      setFeedback({ error: "", success: "Consulta agendada com sucesso!" });
      const data = await getConsultasByPaciente(pacienteId);
      setConsultas(data || []);
    } catch (error: any) {
      setFeedback({ error: error.message || "Erro ao agendar consulta.", success: "" });
    }
  };

  const handleCancelar = async (consultaId: number) => {
    if (!window.confirm("Deseja cancelar esta consulta?")) return;
    try {
      await updateConsultaStatus(consultaId, { status: "CANCELADA" });
      const data = await getConsultasByPaciente(pacienteId!);
      setConsultas(data || []);
    } catch (error: any) {
      setFeedback({ error: error.message || "Erro ao cancelar consulta.", success: "" });
    }
  };

  if (!pacienteId)
    return <p className="p-6 text-center text-red-600">Faça login como paciente para continuar.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 animate-fadeIn">
      <div className="mx-auto max-w-6xl space-y-8">
        {showRefreshHint && (
          <div className="flex items-start justify-between rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 shadow">
            <p>Se aparecer “Não autenticado”, recarregue a página para restaurar a sessão.</p>
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
          <h1 className="text-2xl font-bold text-primary mb-4">Agendar nova consulta</h1>
          <form className="grid gap-4 md:grid-cols-3 mb-6" onSubmit={handleRangeSubmit}>
            <FormField
              label="Profissional"
              name="profissional"
              type="select"
              value={selectedProfissional}
              onChange={(e) => setSelectedProfissional(e.target.value)}
              options={profissionais.map((p) => ({
                value: p.id,
                label: `${p.nome}${p.especialidade ? ` • ${p.especialidade}` : ""}`,
              }))}
            />
            <FormField label="De" name="inicio" type="date" value={start} />
            <FormField label="Até" name="fim" type="date" value={end} />
          </form>
          <Table
            columns={[
              { header: "Horário", accessor: "dataHora", render: (v) => formatDateTime(v) },
              { header: "Especialidade", accessor: "especialidade" },
            ]}
            data={disponibilidades}
            renderActions={(row) => (
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setSlotSelecionado(row)}
              >
                Selecionar
              </button>
            )}
          />
        </section>

        {/* Confirmação */}
        {slotSelecionado && (
          <section className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-primary mb-2">Confirmar agendamento</h2>
            <p className="text-sm text-slate-600 mb-4">
              {formatDateTime(slotSelecionado.dataHora)} com{" "}
              {slotSelecionado.profissionalNome}
            </p>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleAgendar}>
              <FormField
                label="Tipo"
                name="tipoConsulta"
                type="select"
                value={tipoConsulta}
                onChange={(e) => setTipoConsulta(e.target.value)}
                options={[
                  { value: "PRESENCIAL", label: "Presencial" },
                  { value: "TELECONSULTA", label: "Teleconsulta" },
                ]}
              />
              <div className="md:col-span-2 flex gap-3 mt-3">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-2 text-white font-semibold hover:bg-secondary transition"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setSlotSelecionado(null)}
                  className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Consultas */}
        <section className="rounded-xl border bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-primary mb-3">Minhas consultas</h2>
          <Table
            columns={[
              { header: "Horário", accessor: "dataHora", render: (v) => formatDateTime(v) },
              { header: "Profissional", accessor: "profissionalNome" },
              {
                header: "Link",
                accessor: "linkAcesso",
                render: (v) =>
                  v ? (
                    <a href={v} target="_blank" className="text-blue-600 hover:underline">
                      Acessar
                    </a>
                  ) : (
                    "—"
                  ),
              },
              { header: "Status", accessor: "status" },
            ]}
            data={consultas}
            renderActions={(row) => (
              <div className="flex gap-3 text-sm">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => navigate(`/consultas/${row.id}`)}
                >
                  Detalhes
                </button>
                {row.status !== "CANCELADA" && (
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleCancelar(row.id)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            )}
          />
        </section>

        {/* Feedback */}
        {feedback.error && <p className="text-red-600">{feedback.error}</p>}
        {feedback.success && <p className="text-emerald-600">{feedback.success}</p>}
      </div>
    </div>
  );
};

export default PatientDashboard;
