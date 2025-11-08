import { FormEvent, useEffect, useState } from 'react';
import Table from '../../components/Table';
import FormField from '../../components/FormField';
import {
  createConsulta,
  getConsultasByPaciente,
  getDisponibilidades,
  getProfissionais,
  updateConsultaStatus,
} from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { buildDateRange, formatDateTime } from '../../utils/dateHelpers';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [{ start, end }, setRange] = useState(() => buildDateRange(7));
  const [disponibilidades, setDisponibilidades] = useState<any[]>([]);
  const [consultas, setConsultas] = useState<any[]>([]);
  const [slotSelecionado, setSlotSelecionado] = useState<any | null>(null);
  const [consultaForm, setConsultaForm] = useState({ tipoConsulta: 'PRESENCIAL', linkAcesso: '' });
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const pacienteId = user?.pacienteId;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProfissionais();
        setProfissionais(data || []);
        if (data?.length) {
          setSelectedProfissional(String(data[0].id));
        }
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
        const response = await getDisponibilidades({ profissionalId: selectedProfissional, dataInicial: start, dataFinal: end });
        setDisponibilidades(response || []);
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
        tipoConsulta: consultaForm.tipoConsulta,
        linkAcesso: consultaForm.tipoConsulta === 'TELECONSULTA' ? consultaForm.linkAcesso : null,
      });
      setSlotSelecionado(null);
      setConsultaForm({ tipoConsulta: 'PRESENCIAL', linkAcesso: '' });
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

  if (!pacienteId) {
    return <p className="p-6 text-sm text-red-600">Faça login com um usuário paciente para acessar o painel.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded border border-slate-200 bg-white p-4 shadow">
        <h1 className="text-xl font-semibold text-slate-900">Disponibilidades</h1>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleRangeSubmit}>
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
        <div className="mt-4">
          <Table
            columns={[
              { header: 'Horário', accessor: 'dataHora', render: (value: string) => formatDateTime(value) },
              { header: 'Especialidade', accessor: 'especialidade' },
            ]}
            data={disponibilidades}
            renderActions={(row: any) => (
              <button className="text-blue-600 hover:underline" onClick={() => setSlotSelecionado(row)}>
                Selecionar
              </button>
            )}
          />
        </div>
      </div>

      {slotSelecionado && (
        <div className="rounded border border-slate-200 bg-white p-4 shadow">
          <h2 className="text-lg font-semibold text-slate-900">Confirmar consulta</h2>
          <p className="text-sm text-slate-600">
            {formatDateTime(slotSelecionado.dataHora)} com {slotSelecionado.profissionalNome}
          </p>
          <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleAgendar}>
            <FormField
              label="Tipo"
              name="tipoConsulta"
              type="select"
              value={consultaForm.tipoConsulta}
              onChange={(e) => setConsultaForm((prev) => ({ ...prev, tipoConsulta: e.target.value }))}
              options={[
                { value: 'PRESENCIAL', label: 'Presencial' },
                { value: 'TELECONSULTA', label: 'Teleconsulta' },
              ]}
            />
            {consultaForm.tipoConsulta === 'TELECONSULTA' && (
              <FormField
                label="Link da chamada"
                name="linkAcesso"
                value={consultaForm.linkAcesso}
                onChange={(e) => setConsultaForm((prev) => ({ ...prev, linkAcesso: e.target.value }))}
                required
              />
            )}
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white">
                Confirmar
              </button>
              <button type="button" className="rounded border border-slate-300 px-4 py-2 text-sm" onClick={() => setSlotSelecionado(null)}>
                Descartar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded border border-slate-200 bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-slate-900">Consultas agendadas</h2>
        <Table
          columns={[
            { header: 'Horário', accessor: 'dataHora', render: (value: string) => formatDateTime(value) },
            { header: 'Profissional', accessor: 'profissionalNome' },
            { header: 'Status', accessor: 'status' },
          ]}
          data={consultas}
          renderActions={(row: any) =>
            row.status !== 'CANCELADA' && (
              <button className="text-red-600 hover:underline" onClick={() => handleCancelar(row.id)}>
                Cancelar
              </button>
            )
          }
        />
      </div>

      {feedback.error && <p className="text-sm text-red-600">{feedback.error}</p>}
      {feedback.success && <p className="text-sm text-emerald-600">{feedback.success}</p>}
    </div>
  );
};

export default PatientDashboard;
