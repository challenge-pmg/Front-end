import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import FormField from '../../components/FormField';
import type { ConsultaResponse, ConsultaStatus, DisponibilidadeResponse } from '../../services/api';
import {
  createDisponibilidade,
  deleteDisponibilidade,
  getConsultasByProfissional,
  getDisponibilidades,
  updateConsultaStatus,
} from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { buildDateRange, formatDateTime } from '../../utils/dateHelpers';

const ITENS_POR_PAGINA = 6;
const DIAS_POR_PAGINA = 6;

const statusOptions = [
  { value: 'AGENDADA', label: 'Agendada' },
  { value: 'REALIZADA', label: 'Realizada' },
  { value: 'CANCELADA', label: 'Cancelada' },
  { value: 'FALTOU', label: 'Faltou' },
];

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const profissionalId = user?.profissionalId;
  const [{ start, end }, setRange] = useState(() => buildDateRange(14));
  const [slots, setSlots] = useState<DisponibilidadeResponse[]>([]);
  const [consultas, setConsultas] = useState<ConsultaResponse[]>([]);
  const [novoSlot, setNovoSlot] = useState('');
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const [showRefreshHint, setShowRefreshHint] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [paginaCalendario, setPaginaCalendario] = useState(1);

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
        setPagina(1);
        setPaginaCalendario(1);
      } catch (error: any) {
        setFeedback({ error: error.message || 'Erro ao carregar agenda.', success: '' });
      }
    };
    loadAll();
  }, [profissionalId, start, end]);

  const refreshSlots = async () => {
    if (!profissionalId) return;
    const data = await getDisponibilidades({ profissionalId, dataInicial: start, dataFinal: end });
    setSlots(data || []);
    setPaginaCalendario(1);
  };

  const refreshConsultas = async () => {
    if (!profissionalId) return;
    const data = await getConsultasByProfissional(profissionalId);
    setConsultas(data || []);
    setPagina(1);
  };

  const handleNovoSlot = async (event: FormEvent) => {
    event.preventDefault();
    if (!profissionalId || !novoSlot) return;
    try {
      await createDisponibilidade({ profissionalId, dataHora: novoSlot });
      setNovoSlot('');
      await refreshSlots();
      setFeedback({ error: '', success: 'Disponibilidade criada.' });
    } catch (error: any) {
      setFeedback({ error: error.message || 'Erro ao cadastrar disponibilidade.', success: '' });
    }
  };

  const handleExcluirSlot = async (id: number) => {
    if (!window.confirm('Remover o horário livre?')) return;
    try {
      await deleteDisponibilidade(id);
      setSlots((prev) => prev.filter((slot) => slot.id !== id));
    } catch (error: any) {
      setFeedback({ error: error.message || 'Erro ao remover slot.', success: '' });
    }
  };

  const handleStatusChange = async (consultaId: number, status: ConsultaStatus) => {
    try {
      await updateConsultaStatus(consultaId, { status });
      await refreshConsultas();
      await refreshSlots();
    } catch (error: any) {
      setFeedback({ error: error.message || 'Erro ao atualizar status.', success: '' });
    }
  };

  const totalPaginas = Math.max(1, Math.ceil(consultas.length / ITENS_POR_PAGINA));
  const consultasPaginadas = useMemo(
    () => consultas.slice((pagina - 1) * ITENS_POR_PAGINA, pagina * ITENS_POR_PAGINA),
    [consultas, pagina],
  );

  const calendario = useMemo(() => {
    const agrupado = new Map<string, DisponibilidadeResponse[]>();
    slots.forEach((slot) => {
      const dia = slot.dataHora.split('T')[0];
      agrupado.set(dia, [...(agrupado.get(dia) || []), slot]);
    });
    return Array.from(agrupado.entries()).sort(([a], [b]) => (a > b ? 1 : -1));
  }, [slots]);

  const totalPaginasCalendario = Math.max(1, Math.ceil(calendario.length / DIAS_POR_PAGINA));
  const calendarioPaginado = useMemo(
    () => calendario.slice((paginaCalendario - 1) * DIAS_POR_PAGINA, paginaCalendario * DIAS_POR_PAGINA),
    [calendario, paginaCalendario],
  );

  if (!profissionalId) {
    return <p className="p-6 text-center text-red-600">Faça login como profissional para acessar o painel.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 animate-fadeIn">
      <div className="mx-auto max-w-6xl space-y-8">
        {showRefreshHint && (
          <div className="flex items-start justify-between rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 shadow">
            <p>Se a agenda não carregar ou surgir “Não autenticado”, atualize a página.</p>
            <button
              type="button"
              onClick={() => setShowRefreshHint(false)}
              className="ml-4 text-xs font-semibold uppercase tracking-wide text-amber-700"
            >
              Entendi
            </button>
          </div>
        )}

        <section className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow">
          <h1 className="text-2xl font-semibold text-slate-900">Disponibilidades</h1>
          <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleNovoSlot}>
            <FormField label="De" name="rangeStart" type="date" value={start} onChange={(e) => setRange((prev) => ({ ...prev, start: e.target.value }))} />
            <FormField label="Até" name="rangeEnd" type="date" value={end} onChange={(e) => setRange((prev) => ({ ...prev, end: e.target.value }))} />
            <FormField label="Novo horário" name="novoSlot" type="datetime-local" value={novoSlot} onChange={(e) => setNovoSlot(e.target.value)} required />
            <div className="md:col-span-3">
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                Adicionar disponibilidade
              </button>
            </div>
          </form>

          <div className="mt-6">
            {calendario.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum horário livre para o período selecionado.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {calendarioPaginado.map(([dia, lista]) => (
                  <div key={dia} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
                    <p className="text-xs uppercase text-slate-500">
                      {new Date(dia).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {lista.map((slot) => (
                        <li key={slot.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-1 shadow-sm">
                          <span>{new Date(slot.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                          <button className="text-red-600 hover:underline" onClick={() => handleExcluirSlot(slot.id)}>
                            Remover
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {calendario.length > DIAS_POR_PAGINA && (
              <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                <span>
                  Dias {paginaCalendario} de {totalPaginasCalendario}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50"
                    onClick={() => setPaginaCalendario((prev) => Math.max(1, prev - 1))}
                    disabled={paginaCalendario === 1}
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50"
                    onClick={() => setPaginaCalendario((prev) => Math.min(totalPaginasCalendario, prev + 1))}
                    disabled={paginaCalendario === totalPaginasCalendario}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900">Consultas marcadas</h2>
          <Table
            columns={[
              { header: 'Paciente', accessor: 'pacienteNome' },
              { header: 'Horário', accessor: 'dataHora', render: (value: string) => formatDateTime(value) },
              {
                header: 'Link',
                accessor: 'linkAcesso',
                render: (value: string | null) =>
                  value ? (
                    <a href={value} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      Abrir reunião
                    </a>
                  ) : (
                    '—'
                  ),
              },
              { header: 'Status', accessor: 'status' },
            ]}
            data={consultasPaginadas}
            renderActions={(row: ConsultaResponse) => (
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
                <button type="button" className="text-blue-600 hover:underline" onClick={() => navigate(`/consultas/${row.id}`)}>
                  Detalhes
                </button>
              </div>
            )}
          />
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50"
                onClick={() => setPagina((prev) => Math.max(1, prev - 1))}
                disabled={pagina === 1}
              >
                Anterior
              </button>
              <button
                type="button"
                className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50"
                onClick={() => setPagina((prev) => Math.min(totalPaginas, prev + 1))}
                disabled={pagina === totalPaginas}
              >
                Próxima
              </button>
            </div>
          </div>
        </section>

        {feedback.error && <p className="text-sm text-red-600">{feedback.error}</p>}
        {feedback.success && <p className="text-sm text-emerald-600">{feedback.success}</p>}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
