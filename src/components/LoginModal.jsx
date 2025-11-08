import { useEffect, useState } from 'react';
import { createUsuario, getUsuarios } from '../services/api';
import { useAuth } from '../context/AuthContext';
import FormField from './FormField';

const roleOptions = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'PACIENTE', label: 'Paciente' },
  { value: 'PROFISSIONAL', label: 'Profissional' },
];

const initialForm = { nome: '', email: '', senha: '', role: '' };
const initialCredentials = { email: '', senha: '' };

const LoginModal = ({ open, onClose }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState('existing');
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setTab('existing');
      setFormData(initialForm);
      setCredentials(initialCredentials);
      setStatus('');
      setError('');
      return;
    }
    (async () => {
      try {
        const data = await getUsuarios(false);
        setUsuarios(data || []);
      } catch (err) {
        setError(err.message || 'Falha ao listar usuários.');
      }
    })();
  }, [open]);

  const closeModal = () => {
    onClose?.();
  };

  const handleSelectLogin = (event) => {
    event.preventDefault();
    if (!credentials.email || !credentials.senha) {
      setError('Informe email e senha.');
      return;
    }

    const normalize = (value) => value?.trim().toLowerCase();
    const user = usuarios.find((item) => normalize(item.email) === normalize(credentials.email));

    if (!user) {
      setError('Usuário não encontrado para o email informado.');
      return;
    }

    // Como a API não retorna a senha, validamos apenas o preenchimento local.
    if (user.senha && user.senha !== credentials.senha) {
      setError('Senha inválida.');
      return;
    }

    login({ userId: user.id, nome: user.nome, email: user.email, role: user.role });
    setStatus('Sessão iniciada.');
    closeModal();
  };

  const handleCredentialsChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!formData.nome || !formData.email || !formData.senha || !formData.role) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    setStatus('');
    try {
      const user = await createUsuario(formData, false);
      login({ userId: user.id, nome: user.nome, email: user.email, role: user.role });
      setStatus('Conta criada e sessão iniciada.');
      closeModal();
    } catch (err) {
      setError(err.message || 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Entrar</h2>
          <button type="button" onClick={closeModal} className="text-sm text-slate-500 hover:text-slate-900">
            Fechar
          </button>
        </div>

        <div className="mt-4 flex gap-2 text-sm">
          <button
            type="button"
            className={`flex-1 rounded px-3 py-2 font-semibold ${
              tab === 'existing' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
            onClick={() => setTab('existing')}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`flex-1 rounded px-3 py-2 font-semibold ${tab === 'create' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
            onClick={() => setTab('create')}
          >
            Criar conta
          </button>
        </div>

        {(status || error) && (
          <div className={`mt-4 rounded border px-3 py-2 text-sm ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
            {error || status}
          </div>
        )}

        {tab === 'existing' ? (
          <form className="mt-4 space-y-3" onSubmit={handleSelectLogin}>
            <FormField
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleCredentialsChange}
              required
            />
            <FormField
              label="Senha"
              name="senha"
              type="password"
              value={credentials.senha}
              onChange={handleCredentialsChange}
              required
            />
            <button type="submit" className="w-full rounded bg-slate-900 px-4 py-2 font-semibold text-white">
              Entrar
            </button>
          </form>
        ) : (
          <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={handleCreate}>
            <FormField label="Nome" name="nome" value={formData.nome} onChange={updateFormData} required />
            <FormField label="Email" name="email" type="email" value={formData.email} onChange={updateFormData} required />
            <FormField label="Senha" name="senha" type="password" value={formData.senha} onChange={updateFormData} required />
            <FormField
              label="Perfil"
              name="role"
              type="select"
              value={formData.role}
              onChange={updateFormData}
              required
              options={roleOptions}
            />
            <div className="sm:col-span-2">
              <button type="submit" disabled={loading} className="w-full rounded bg-slate-900 px-4 py-2 font-semibold text-white">
                {loading ? 'Salvando...' : 'Criar e entrar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
