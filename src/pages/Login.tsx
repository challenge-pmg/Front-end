import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { login as loginRequest, registerPaciente, registerProfissional } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { sampleCredentials } from '../mocks/sampleCredentials';

const STAFF_CODE = import.meta.env.VITE_FUNCIONARIO_CODE || 'HC-ACCESS';

type Mode = 'login' | 'paciente' | 'profissional';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const [credentials, setCredentials] = useState({ email: '', senha: '' });
  const [pacienteForm, setPacienteForm] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    sexo: 'F',
    dataNascimento: '',
    telefone: '',
    cidade: '',
  });
  const [profForm, setProfForm] = useState({
    nome: '',
    email: '',
    senha: '',
    crm: '',
    especialidade: '',
    codigoInterno: '',
  });

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      const response = await loginRequest(credentials);
      login({
        userId: response.usuarioId,
        nome: response.nome,
        email: response.email,
        role: response.role,
        pacienteId: response.pacienteId ?? null,
        profissionalId: response.profissionalId ?? null,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar');
    } finally {
      setPending(false);
    }
  };

  const handlePacienteSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      await registerPaciente(pacienteForm);
      setStatus('Cadastro de paciente realizado. Faça login com o novo usuário.');
      setMode('login');
      setPacienteForm((prev) => ({
        ...prev,
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        telefone: '',
        cidade: '',
      }));
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar paciente.');
    } finally {
      setPending(false);
    }
  };

  const handleProfSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (profForm.codigoInterno.trim() !== STAFF_CODE) {
      setError('Código interno inválido.');
      return;
    }
    setPending(true);
    setError('');
    try {
      await registerProfissional({
        nome: profForm.nome,
        email: profForm.email,
        senha: profForm.senha,
        crm: profForm.crm,
        especialidade: profForm.especialidade,
        codigoFuncionario: profForm.codigoInterno,
      });
      setStatus('Cadastro de profissional realizado. Aguarde aprovação e faça login.');
      setMode('login');
      setProfForm({ nome: '', email: '', senha: '', crm: '', especialidade: '', codigoInterno: '' });
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar profissional.');
    } finally {
      setPending(false);
    }
  };

  const renderLoginForm = () => (
    <form className="space-y-4" onSubmit={handleLogin}>
      <FormField label="Email" name="email" type="email" value={credentials.email} onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))} required />
      <FormField label="Senha" name="senha" type="password" value={credentials.senha} onChange={(e) => setCredentials((prev) => ({ ...prev, senha: e.target.value }))} required />
      <button type="submit" disabled={pending} className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white">
        {pending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );

  const renderPacienteForm = () => (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handlePacienteSubmit}>
      <FormField label="Nome" name="nome" value={pacienteForm.nome} onChange={(e) => setPacienteForm((prev) => ({ ...prev, nome: e.target.value }))} required />
      <FormField label="Email" name="email" type="email" value={pacienteForm.email} onChange={(e) => setPacienteForm((prev) => ({ ...prev, email: e.target.value }))} required />
      <FormField label="Senha" name="senha" type="password" value={pacienteForm.senha} onChange={(e) => setPacienteForm((prev) => ({ ...prev, senha: e.target.value }))} required />
      <FormField label="CPF" name="cpf" value={pacienteForm.cpf} onChange={(e) => setPacienteForm((prev) => ({ ...prev, cpf: e.target.value }))} required />
      <FormField
        label="Sexo"
        name="sexo"
        type="select"
        value={pacienteForm.sexo}
        onChange={(e) => setPacienteForm((prev) => ({ ...prev, sexo: e.target.value }))}
        options={[
          { value: 'F', label: 'Feminino' },
          { value: 'M', label: 'Masculino' },
        ]}
      />
      <FormField
        label="Data de nascimento"
        name="dataNascimento"
        type="date"
        value={pacienteForm.dataNascimento}
        onChange={(e) => setPacienteForm((prev) => ({ ...prev, dataNascimento: e.target.value }))}
        required
      />
      <FormField label="Telefone" name="telefone" value={pacienteForm.telefone} onChange={(e) => setPacienteForm((prev) => ({ ...prev, telefone: e.target.value }))} />
      <FormField label="Cidade" name="cidade" value={pacienteForm.cidade} onChange={(e) => setPacienteForm((prev) => ({ ...prev, cidade: e.target.value }))} />
      <div className="md:col-span-2">
        <button type="submit" disabled={pending} className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white">
          {pending ? 'Enviando...' : 'Criar conta de paciente'}
        </button>
      </div>
    </form>
  );

  const renderProfForm = () => (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleProfSubmit}>
      <FormField label="Nome" name="nome" value={profForm.nome} onChange={(e) => setProfForm((prev) => ({ ...prev, nome: e.target.value }))} required />
      <FormField label="Email" name="email" type="email" value={profForm.email} onChange={(e) => setProfForm((prev) => ({ ...prev, email: e.target.value }))} required />
      <FormField label="Senha" name="senha" type="password" value={profForm.senha} onChange={(e) => setProfForm((prev) => ({ ...prev, senha: e.target.value }))} required />
      <FormField label="CRM" name="crm" value={profForm.crm} onChange={(e) => setProfForm((prev) => ({ ...prev, crm: e.target.value }))} required />
      <FormField label="Especialidade" name="especialidade" value={profForm.especialidade} onChange={(e) => setProfForm((prev) => ({ ...prev, especialidade: e.target.value }))} required />
      <FormField label="Código interno" name="codigoInterno" value={profForm.codigoInterno} onChange={(e) => setProfForm((prev) => ({ ...prev, codigoInterno: e.target.value }))} required />
      <p className="md:col-span-2 text-xs text-slate-500">Use o código fornecido pela coordenação ({STAFF_CODE}).</p>
      <div className="md:col-span-2">
        <button type="submit" disabled={pending} className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white">
          {pending ? 'Enviando...' : 'Criar conta de profissional'}
        </button>
      </div>
    </form>
  );

  return (
    <section className="mx-auto max-w-3xl space-y-6 rounded border border-slate-200 bg-white p-6 shadow">
      <h1 className="text-2xl font-semibold text-slate-900">Acesse o HC Teleconsulta</h1>
      <p className="text-sm text-slate-600">Use suas credenciais corporativas ou crie uma conta.</p>

      <div className="flex flex-wrap gap-2 text-sm">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`rounded px-3 py-2 font-semibold ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode('paciente')}
          className={`rounded px-3 py-2 font-semibold ${mode === 'paciente' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Criar conta (Paciente)
        </button>
        <button
          type="button"
          onClick={() => setMode('profissional')}
          className={`rounded px-3 py-2 font-semibold ${mode === 'profissional' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Criar conta (Profissional)
        </button>
      </div>

      {status && <p className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{status}</p>}
      {error && <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {mode === 'login' && renderLoginForm()}
      {mode === 'paciente' && renderPacienteForm()}
      {mode === 'profissional' && renderProfForm()}

      <div>
        <h2 className="text-sm font-semibold text-slate-700">Logins de exemplo</h2>
        <ul className="mt-2 text-xs text-slate-500">
          {sampleCredentials.map((cred) => (
            <li key={cred.email}>
              {cred.label}: {cred.email} / {cred.senha}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Login;
