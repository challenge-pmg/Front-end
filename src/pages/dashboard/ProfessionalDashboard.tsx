import { FormEvent, useEffect, useState } from 'react';
import Table from '../../components/Table';
import FormField from '../../components/FormField';
import {
  createDisponibilidade,
  deleteDisponibilidade,
  getConsultasByProfissional,
  getDisponibilidades,
  updateConsultaStatus,
} from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { buildDateRange, formatDateTime } from '../../utils/dateHelpers';

const statusOptions = [
  { value: 'AGENDADA', label: 'Agendada' },
  { value: 'REALIZADA', label: 'Realizada' },
  { value: 'CANCELADA', label: 'Cancelada' },
  { value: 'FALTOU', label: 'Faltou' },
];

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const profissionalId = user?.profissionalId;
  const [{ start, end }, setRange] = useState(() => buildDateRange(14));
  const [slots, setSlots] = useState<any[]>([]);
  const [consultas, setConsultas] = useState<any[]>([]);
  const [novoSlot, setNovoSlot] = useState('');
  const [feedback, setFeedback] = useState({ error: '', success: '' });

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
        setFeedback({ error: error.message || 'Erro ao carregar agenda.', success: '' });
      }
    };
    loadAll();
  }, [profissionalId, start, end]);

  const refreshSlots = async () => {
    if (!profissionalId) return;
    const data = await getDisponibilidades({ profissionalId, dataInicial: start, dataFinal: end });
    setSlots(data || []);
  };

  const refreshConsultas = async () => {
    if (!profissionalId) return;
    const data = await getConsultasByProfissional(profissionalId);
    setConsultas(data || []);
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

  const handleStatusChange = async (consultaId: number, status: string) => {
    try {
      await updateConsultaStatus(consultaId, { status });
      await refreshConsultas();
      await refreshSlots();
    } catch (error: any) {
      setFeedback({ error: error.message || 'Erro ao atualizar status.', success: '' });
    }
  };

  if (!profissionalId) {
    return <p className="p-6 text-sm text-red-600">Faça login como profissional para acessar seu painel.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded border border-slate-200 bg-white p-4 shadow">
        <h1 className="text-xl font-semibold text-slate-900">Disponibilidades</h1>
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
        <Table
          columns={[
            { header: 'Horário', accessor: 'dataHora', render: (value: string) => formatDateTime(value) },
          ]}
          data={slots}
          renderActions={(row: any) => (
            <button className="text-red-600 hover:underline" onClick={() => handleExcluirSlot(row.id)}>
              Remover
            </button>
          )}
        />
      </div>

      <div className="rounded border border-slate-200 bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-slate-900">Consultas marcadas</h2>
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
          data={consultas}
          renderActions={(row: any) => (
            <select
              className="rounded border border-slate-300 px-2 py-1 text-xs"
              value={row.status}
              onChange={(e) => handleStatusChange(row.id, e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      {feedback.error && <p className="text-sm text-red-600">{feedback.error}</p>}
      {feedback.success && <p className="text-sm text-emerald-600">{feedback.success}</p>}
    </div>
  );
};

export default ProfessionalDashboard;
