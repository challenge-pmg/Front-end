import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import {
  login as loginRequest,
  registerPaciente,
  registerProfissional,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import { sampleCredentials } from "../mocks/sampleCredentials";

const STAFF_CODE = import.meta.env.VITE_FUNCIONARIO_CODE || "HC-ACCESS";

type Mode = "login" | "paciente" | "profissional";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const [credentials, setCredentials] = useState({ email: "", senha: "" });
  const [pacienteForm, setPacienteForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    sexo: "F",
    dataNascimento: "",
    telefone: "",
    cidade: "",
  });
  const [profForm, setProfForm] = useState({
    nome: "",
    email: "",
    senha: "",
    crm: "",
    especialidade: "",
    codigoInterno: "",
  });

  // ================= LOGIN =================
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
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
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro ao autenticar");
    } finally {
      setPending(false);
    }
  };

  // ================= CADASTRO PACIENTE =================
  const handlePacienteSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await registerPaciente(pacienteForm);
      setStatus(
        "Cadastro de paciente realizado com sucesso! Faça login com o novo usuário."
      );
      setMode("login");
      setPacienteForm({
        nome: "",
        email: "",
        senha: "",
        cpf: "",
        sexo: "F",
        dataNascimento: "",
        telefone: "",
        cidade: "",
      });
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar paciente.");
    } finally {
      setPending(false);
    }
  };

  // ================= CADASTRO PROFISSIONAL =================
  const handleProfSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (profForm.codigoInterno.trim() !== STAFF_CODE) {
      setError("Código interno inválido.");
      return;
    }
    setPending(true);
    setError("");
    try {
      await registerProfissional({
        nome: profForm.nome,
        email: profForm.email,
        senha: profForm.senha,
        crm: profForm.crm,
        especialidade: profForm.especialidade,
        codigoFuncionario: profForm.codigoInterno,
      });
      setStatus(
        "Cadastro de profissional realizado. Aguarde aprovação e faça login."
      );
      setMode("login");
      setProfForm({
        nome: "",
        email: "",
        senha: "",
        crm: "",
        especialidade: "",
        codigoInterno: "",
      });
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar profissional.");
    } finally {
      setPending(false);
    }
  };

  // ================= FORMULÁRIOS =================
  const renderLoginForm = () => (
    <form className="space-y-4" onSubmit={handleLogin}>
      <FormField
        label="E-mail"
        name="email"
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <FormField
        label="Senha"
        name="senha"
        type="password"
        value={credentials.senha}
        onChange={(e) =>
          setCredentials((prev) => ({ ...prev, senha: e.target.value }))
        }
        required
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary py-3 font-semibold text-white hover:bg-secondary transition-all"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );

  const renderPacienteForm = () => (
    <form
      className="grid gap-4 md:grid-cols-2 animate-fadeIn"
      onSubmit={handlePacienteSubmit}
    >
      <FormField
        label="Nome"
        name="nome"
        value={pacienteForm.nome}
        onChange={(e) =>
          setPacienteForm((prev) => ({ ...prev, nome: e.target.value }))
        }
        required
      />
      <FormField
        label="E-mail"
        name="email"
        type="email"
        value={pacienteForm.email}
        onChange={(e) =>
          setPacienteForm((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <FormField
        label="Senha"
        name="senha"
        type="password"
        value={pacienteForm.senha}
        onChange={(e) =>
          setPacienteForm((prev) => ({ ...prev, senha: e.target.value }))
        }
        required
      />
      <FormField
        label="CPF"
        name="cpf"
        value={pacienteForm.cpf}
        onChange={(e) =>
          setPacienteForm((prev) => ({ ...prev, cpf: e.target.value }))
        }
        required
      />
      <FormField
        label="Sexo"
        name="sexo"
        type="select"
        value={pacienteForm.sexo}
        onChange={(e) =>
          setPacienteForm((prev) => ({ ...prev, sexo: e.target.value }))
        }
        options={[
          { value: "F", label: "Feminino" },
          { value: "M", label: "Masculino" },
        ]}
      />
      <FormField
        label="Data de nascimento"
        name="dataNascimento"
        type="date"
        value={pacienteForm.dataNascimento}
        onChange={(e) =>
          setPacienteForm((prev) => ({
            ...prev,
            dataNascimento: e.target.value,
          }))
        }
        required
      />
      <FormField
        label="Telefone"
        name="telefone"
        value={pacienteForm.telefone}
        onChange={(e) =>
          setPacienteForm((prev) => ({ ...prev, telefone: e.target.value }))
        }
      />
      <FormField
        label="Cidade"
        name="cidade"
        value={pacienteForm.cidade}
        onChange={(e) =>
          setPacienteForm((prev) => ({ ...prev, cidade: e.target.value }))
        }
      />
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-primary py-3 font-semibold text-white hover:bg-secondary transition-all"
        >
          {pending ? "Enviando..." : "Criar conta de paciente"}
        </button>
      </div>
    </form>
  );

  const renderProfForm = () => (
    <form
      className="grid gap-4 md:grid-cols-2 animate-fadeIn"
      onSubmit={handleProfSubmit}
    >
      <FormField
        label="Nome"
        name="nome"
        value={profForm.nome}
        onChange={(e) =>
          setProfForm((prev) => ({ ...prev, nome: e.target.value }))
        }
        required
      />
      <FormField
        label="E-mail"
        name="email"
        type="email"
        value={profForm.email}
        onChange={(e) =>
          setProfForm((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <FormField
        label="Senha"
        name="senha"
        type="password"
        value={profForm.senha}
        onChange={(e) =>
          setProfForm((prev) => ({ ...prev, senha: e.target.value }))
        }
        required
      />
      <FormField
        label="CRM"
        name="crm"
        value={profForm.crm}
        onChange={(e) =>
          setProfForm((prev) => ({ ...prev, crm: e.target.value }))
        }
        required
      />
      <FormField
        label="Especialidade"
        name="especialidade"
        value={profForm.especialidade}
        onChange={(e) =>
          setProfForm((prev) => ({
            ...prev,
            especialidade: e.target.value,
          }))
        }
        required
      />
      <FormField
        label="Código interno"
        name="codigoInterno"
        value={profForm.codigoInterno}
        onChange={(e) =>
          setProfForm((prev) => ({
            ...prev,
            codigoInterno: e.target.value,
          }))
        }
        required
      />
      <p className="md:col-span-2 text-xs text-slate-500">
        Use o código fornecido pela coordenação ({STAFF_CODE}).
      </p>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-primary py-3 font-semibold text-white hover:bg-secondary transition-all"
        >
          {pending ? "Enviando..." : "Criar conta de profissional"}
        </button>
      </div>
    </form>
  );

  // ================= LAYOUT PRINCIPAL =================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl transition-all">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Acesse o TeleSaúde HC
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Faça login ou crie sua conta para continuar.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { id: "login", label: "Entrar" },
            { id: "paciente", label: "Criar conta (Paciente)" },
            { id: "profissional", label: "Criar conta (Profissional)" },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setMode(btn.id as Mode)}
              className={`rounded-full px-4 py-2 font-semibold text-sm shadow-sm transition-all ${
                mode === btn.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {status && (
          <p className="rounded border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 mb-4 text-center">
            {status}
          </p>
        )}
        {error && (
          <p className="rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 mb-4 text-center">
            {error}
          </p>
        )}

        <div className="animate-fadeIn">
          {mode === "login" && renderLoginForm()}
          {mode === "paciente" && renderPacienteForm()}
          {mode === "profissional" && renderProfForm()}
        </div>

        <div className="mt-10 text-center text-xs text-slate-500 border-t pt-4">
          <h2 className="font-semibold mb-2">Logins de exemplo</h2>
          <ul className="space-y-1">
            {sampleCredentials.map((cred) => (
              <li key={cred.email}>
                <span className="font-medium text-gray-700">{cred.label}</span>:{" "}
                {cred.email} / {cred.senha}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Login;
