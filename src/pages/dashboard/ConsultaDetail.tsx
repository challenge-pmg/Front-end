import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ConsultaResponse } from '../../services/api';
import { getConsultaById, updateConsultaStatus } from '../../services/api';
import { formatDateTime } from '../../utils/dateHelpers';

const statusBadges: Record<string, string> = {
  AGENDADA: 'bg-blue-100 text-blue-800',
  REALIZADA: 'bg-emerald-100 text-emerald-800',
  CANCELADA: 'bg-slate-200 text-slate-700',
  FALTOU: 'bg-amber-100 text-amber-800',
};

const ConsultaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState<ConsultaResponse | null>(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setFeedback({ error: 'ID inválido.', success: '' });
        setLoading(false);
        return;
      }
      try {
        const data = await getConsultaById(Number(id));
        setConsulta(data);
        setStatusUpdate(data.status);
      } catch (error: any) {
        setFeedback({ error: error.message || 'Erro ao carregar consulta.', success: '' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleStatusChange = async () => {
    if (!consulta || statusUpdate === consulta.status) return;
    try {
      const updated = await updateConsultaStatus(consulta.id, { status: statusUpdate as any });
      setConsulta(updated);
      setFeedback({ error: '', success: 'Status atualizado com sucesso.' });
    } catch (error: any) {
      setFeedback({ error: error.message || 'Não foi possível atualizar o status.', success: '' });
    }
  };

  if (loading) {
    return <p className="p-6 text-sm text-slate-600">Carregando consulta...</p>;
  }

  if (!consulta) {
    return (
      <div className="space-y-4 p-6">
        <p className="text-sm text-red-600">{feedback.error || 'Consulta não encontrada.'}</p>
        <button className="rounded border border-slate-300 px-4 py-2 text-sm" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Detalhes da consulta #{consulta.id}</h1>
        <button className="rounded border border-slate-300 px-4 py-2 text-sm" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>

      <div className="grid gap-4 rounded border border-slate-200 bg-white p-6 shadow md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-slate-500">Paciente</p>
          <p className="text-lg font-semibold text-slate-900">{consulta.pacienteNome || consulta.pacienteId}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Profissional</p>
          <p className="text-lg font-semibold text-slate-900">{consulta.profissionalNome || consulta.profissionalId}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Horário</p>
          <p className="text-lg font-semibold text-slate-900">{formatDateTime(consulta.dataHora)}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Tipo</p>
          <p className="text-lg font-semibold text-slate-900">
            {consulta.tipoConsulta === 'TELECONSULTA' ? 'Teleconsulta' : 'Presencial'}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Status</p>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadges[consulta.status] || 'bg-slate-100 text-slate-800'}`}
          >
            {consulta.status}
          </span>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Link de acesso</p>
          {consulta.linkAcesso ? (
            <a href={consulta.linkAcesso} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              Abrir reunião
            </a>
          ) : (
            <p className="text-sm text-slate-500">Consulta presencial</p>
          )}
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-900">Atualizar status</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <select
            className="rounded border border-slate-300 px-3 py-2 text-sm"
            value={statusUpdate}
            onChange={(e) => setStatusUpdate(e.target.value)}
          >
            <option value="AGENDADA">Agendada</option>
            <option value="REALIZADA">Realizada</option>
            <option value="CANCELADA">Cancelada</option>
            <option value="FALTOU">Faltou</option>
          </select>
          <button
            type="button"
            onClick={handleStatusChange}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            disabled={statusUpdate === consulta.status}
          >
            Salvar
          </button>
        </div>
        {feedback.error && <p className="mt-3 text-sm text-red-600">{feedback.error}</p>}
        {feedback.success && <p className="mt-3 text-sm text-emerald-600">{feedback.success}</p>}
      </div>
    </section>
  );
};

export default ConsultaDetail;

