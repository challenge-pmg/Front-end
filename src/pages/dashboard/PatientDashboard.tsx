import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import FormField from '../../components/FormField';
import type { ConsultaResponse, DisponibilidadeResponse, ProfissionalResponse } from '../../services/api';
import {
  createConsulta,
  getConsultasByPaciente,
  getDisponibilidades,
  getProfissionais,
  updateConsultaStatus,
} from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { buildDateRange, formatDateTime } from '../../utils/dateHelpers';

const ITENS_POR_PAGINA = 5;
const DIAS_POR_PAGINA = 6;

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profissionais, setProfissionais] = useState<ProfissionalResponse[]>([]);
  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [{ start, end }, setRange] = useState(() => buildDateRange(7));
  const [disponibilidades, setDisponibilidades] = useState<DisponibilidadeResponse[]>([]);
  const [consultas, setConsultas] = useState<ConsultaResponse[]>([]);
  const [slotSelecionado, setSlotSelecionado] = useState<DisponibilidadeResponse | null>(null);
  const [tipoConsulta, setTipoConsulta] = useState<'PRESENCIAL' | 'TELECONSULTA'>('PRESENCIAL');
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const [showRefreshHint, setShowRefreshHint] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [paginaCalendario, setPaginaCalendario] = useState(1);
  const pacienteId = user?.pacienteId;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProfissionais();
        setProfissionais(data || []);
        if (data?.length) setSelectedProfissional(String(data[0].id));
      } catch (error: any) {
        setFeedback({ error: error.message || 'Erro ao carregar profissionais.', success: '' });
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
        setPagina(1);
      } catch (error: any) {
        setFeedback({ error: error.message || 'Erro ao carregar consultas.', success: '' });
      }
    };
    loadConsultas();
  }, [pacienteId]);

  useEffect(() => {
    if (!selectedProfissional) {
      setDisponibilidades([]);
      return;
    }
    const loadSlots = async () => {
      try {
        const response = await getDisponibilidades({
          profissionalId: selectedProfissional,
          dataInicial: start,
          dataFinal: end,
        });
        setDisponibilidades(response || []);
        setPaginaCalendario(1);
      } catch (error: any) {
        setFeedback({ error: error.message || 'Erro ao carregar disponibilidades.', success: '' });
      }
    };
    loadSlots();
  }, [selectedProfissional, start, end]);

  const refreshConsultas = async () => {
    if (!pacienteId) return;
    const [slots, lista] = await Promise.all([
      getDisponibilidades({ profissionalId: selectedProfissional, dataInicial: start, dataFinal: end }),
      getConsultasByPaciente(pacienteId),
    ]);
    setDisponibilidades(slots || []);
    setConsultas(lista || []);
    setPagina(1);
  };

  const handleRangeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const inicio = (form.elements.namedItem('inicio') as HTMLInputElement).value;
    const fim = (form.elements.namedItem('fim') as HTMLInputElement).value;
    if (inicio && fim) {
      setRange({ start: inicio, end: fim });
    }
  };

  const handleAgendar = async (event: FormEvent) => {
    event.preventDefault();
    if (!pacienteId || !slotSelecionado) return;
    try {
      await createConsulta({
        pacienteId,
        profissionalId: slotSelecionado.profissionalId,
        disponibilidadeId: slotSelecionado.id,
        tipoConsulta,
      });
      setSlotSelecionado(null);
      setTipoConsulta('PRESENCIAL');
      await refreshConsultas();
      setFeedback({ error: '', success: 'Consulta agendada com sucesso!' });
    } catch (error: any) {
      setFeedback({ error: error.message || 'Erro ao agendar consulta.', success: '' });
    }
  };

  const handleCancelar = async (consultaId: number) => {
    if (!window.confirm('Deseja cancelar esta consulta?')) return;
    try {
      await updateConsultaStatus(consultaId, { status: 'CANCELADA' });
      await refreshConsultas();
    } catch (error: any) {
      setFeedback({ error: error.message || 'Erro ao cancelar consulta.', success: '' });
    }
  };

  const totalPaginas = Math.max(1, Math.ceil(consultas.length / ITENS_POR_PAGINA));
  const consultasPaginadas = useMemo(
    () => consultas.slice((pagina - 1) * ITENS_POR_PAGINA, pagina * ITENS_POR_PAGINA),
    [consultas, pagina],
  );

  const calendario = useMemo(() => {
    const agrupado = new Map<string, DisponibilidadeResponse[]>();
    disponibilidades.forEach((slot) => {
      const dia = slot.dataHora.split('T')[0];
      agrupado.set(dia, [...(agrupado.get(dia) || []), slot]);
    });
    return Array.from(agrupado.entries()).sort(([a], [b]) => (a > b ? 1 : -1));
  }, [disponibilidades]);

  const totalPaginasCalendario = Math.max(1, Math.ceil(calendario.length / DIAS_POR_PAGINA));
  const calendarioPaginado = useMemo(
    () => calendario.slice((paginaCalendario - 1) * DIAS_POR_PAGINA, paginaCalendario * DIAS_POR_PAGINA),
    [calendario, paginaCalendario],
  );

  if (!pacienteId) {
    return <p className="p-6 text-center text-red-600">Faça login como paciente para continuar.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 animate-fadeIn">
      <div className="mx-auto max-w-6xl space-y-8">
        {showRefreshHint && (
          <div className="flex items-start justify-between rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 shadow">
            <p>Se aparecer “Não autenticado”, recarregue a página para restabelecer a sessão.</p>
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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold text-slate-900">Calendário de disponibilidades</h1>
            <form className="grid gap-3 md:grid-cols-3" onSubmit={handleRangeSubmit}>
              <FormField
                label="Profissional"
                name="profissional"
                type="select"
                value={selectedProfissional}
                onChange={(e) => setSelectedProfissional(e.target.value)}
                options={profissionais.map((prof) => ({ value: prof.id, label: `${prof.nome}${prof.especialidade ? ` • ${prof.especialidade}` : ''}` }))}
              />
              <FormField label="De" name="inicio" type="date" value={start} onChange={(e) => setRange((prev) => ({ ...prev, start: e.target.value }))} />
              <FormField label="Até" name="fim" type="date" value={end} onChange={(e) => setRange((prev) => ({ ...prev, end: e.target.value }))} />
            </form>
          </div>

          <div className="mt-6">
            {calendario.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhuma disponibilidade encontrada neste período.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {calendarioPaginado.map(([dia, slots]) => (
                  <div key={dia} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
                    <p className="text-xs uppercase text-slate-500">
                      {new Date(dia).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {slots.map((slot) => (
                        <li key={slot.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-1 shadow-sm">
                          <span>{new Date(slot.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                          <button className="text-blue-600 hover:underline" onClick={() => setSlotSelecionado(slot)}>
                            Selecionar
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

        {slotSelecionado && (
          <section className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow">
            <h2 className="text-xl font-semibold text-slate-900">Confirmar consulta</h2>
            <p className="text-sm text-slate-600">
              {formatDateTime(slotSelecionado.dataHora)} com {slotSelecionado.profissionalNome}
            </p>
            <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleAgendar}>
              <FormField
                label="Tipo"
                name="tipoConsulta"
                type="select"
                value={tipoConsulta}
                onChange={(e) => setTipoConsulta(e.target.value as 'PRESENCIAL' | 'TELECONSULTA')}
                options={[
                  { value: 'PRESENCIAL', label: 'Presencial' },
                  { value: 'TELECONSULTA', label: 'Teleconsulta' },
                ]}
              />
              <p className="text-sm text-slate-500 md:col-span-2">
                Para teleconsultas, o link será disponibilizado automaticamente após a confirmação.
              </p>
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white">
                  Confirmar
                </button>
                <button type="button" className="rounded border border-slate-300 px-4 py-2 text-sm" onClick={() => setSlotSelecionado(null)}>
                  Descartar
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900">Consultas agendadas</h2>
          <Table
            columns={[
              { header: 'Horário', accessor: 'dataHora', render: (value: string) => formatDateTime(value) },
              { header: 'Profissional', accessor: 'profissionalNome' },
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
              <div className="flex flex-wrap gap-3 text-sm">
                <button className="text-blue-600 hover:underline" onClick={() => navigate(`/consultas/${row.id}`)}>
                  Detalhes
                </button>
                {row.status !== 'CANCELADA' && (
                  <button className="text-red-600 hover:underline" onClick={() => handleCancelar(row.id)}>
                    Cancelar
                  </button>
                )}
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

export default PatientDashboard;
