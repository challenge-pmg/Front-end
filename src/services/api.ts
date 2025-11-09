const DEFAULT_API = 'https://hc-teleonsulta-api-java-1.onrender.com';
const rawBase = import.meta.env.VITE_API_BASE_URL?.trim();
export const API_BASE = rawBase || DEFAULT_API;

const STATUS_MESSAGES = {
  400: 'Dados inválidos',
  401: 'Não autenticado',
  403: 'Sem permissão',
  404: 'Não encontrado',
  409: 'Conflito de dados',
};

export const SESSION_STORAGE_KEYS = {
  userId: 'hc-teleconsulta-user-id',
  role: 'hc-teleconsulta-role',
  nome: 'hc-teleconsulta-nome',
  email: 'hc-teleconsulta-email',
  pacienteId: 'hc-teleconsulta-paciente-id',
  profissionalId: 'hc-teleconsulta-profissional-id',
};

const getStoredSession = () => {
  if (typeof window === 'undefined') return null;
  const userId = window.localStorage.getItem(SESSION_STORAGE_KEYS.userId);
  if (!userId) return null;
  return {
    userId: Number(userId),
    role: window.localStorage.getItem(SESSION_STORAGE_KEYS.role) || 'PACIENTE',
    nome: window.localStorage.getItem(SESSION_STORAGE_KEYS.nome) || 'Usuário',
    email: window.localStorage.getItem(SESSION_STORAGE_KEYS.email) || '',
    pacienteId: Number(window.localStorage.getItem(SESSION_STORAGE_KEYS.pacienteId) || '0') || null,
    profissionalId: Number(window.localStorage.getItem(SESSION_STORAGE_KEYS.profissionalId) || '0') || null,
  };
};

const buildError = async (response: Response) => {
  const text = await response.text();
  let parsed: any = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }

  const message =
    (parsed && typeof parsed === 'object' && 'message' in parsed && parsed.message) ||
    STATUS_MESSAGES[response.status as keyof typeof STATUS_MESSAGES] ||
    'Erro no servidor';

  return {
    status: response.status,
    message,
    body: parsed,
  };
};

export async function fetchJson(
  path: string,
  options: RequestInit = {},
  { requireAuth = true, timeoutMs = 15000 } = {},
) {
  const storedUser = getStoredSession();
  if (requireAuth && !storedUser) {
    throw { status: 401, message: STATUS_MESSAGES[401], body: null };
  }

  const headers = new Headers(options.headers || {});
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (storedUser?.userId) {
    headers.set('X-User-Id', String(storedUser.userId));
    if (storedUser.role) headers.set('X-User-Role', storedUser.role);
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : undefined;

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    signal: controller?.signal ?? options.signal,
    body:
      options.body && typeof options.body === 'object' && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
  };

  try {
    const response = await fetch(`${API_BASE}${path}`, fetchOptions);

    if (response.status === 204) {
      return { ok: true };
    }

    if (response.ok) {
      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        return response.json();
      }
      return response.text();
    }

    throw await buildError(response);
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      throw { status: 0, message: 'Tempo limite excedido. Tente novamente.', body: null };
    }
    throw error;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

const buildQuery = (params: Record<string, any> = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
};

const withAuth = (requireAuth = true) => ({ requireAuth });

export type Role = 'PACIENTE' | 'PROFISSIONAL';

export type LoginPayload = {
  email: string;
  senha: string;
};

export type AuthResponse = {
  usuarioId: number;
  nome: string;
  email: string;
  role: Role;
  pacienteId: number | null;
  profissionalId: number | null;
};

export type ProfissionalResponse = {
  id: number;
  nome: string;
  especialidade?: string | null;
};

export type DisponibilidadeResponse = {
  id: number;
  profissionalId: number;
  dataHora: string;
  profissionalNome?: string;
  especialidade?: string | null;
};

export type ConsultaStatus = 'AGENDADA' | 'REALIZADA' | 'CANCELADA' | 'FALTOU';

export type ConsultaRequest = {
  pacienteId: number;
  profissionalId: number;
  disponibilidadeId: number;
  tipoConsulta: 'PRESENCIAL' | 'TELECONSULTA';
};

export type ConsultaResponse = {
  id: number;
  pacienteId: number;
  profissionalId: number;
  disponibilidadeId: number;
  dataHora: string;
  tipoConsulta: 'PRESENCIAL' | 'TELECONSULTA';
  status: ConsultaStatus;
  linkAcesso: string | null;
  pacienteNome?: string;
  profissionalNome?: string;
};

export const login = (payload: LoginPayload) =>
  fetchJson('/auth/login', { method: 'POST', body: payload }, withAuth(false)) as Promise<AuthResponse>;
export const registerPaciente = (payload: any) =>
  fetchJson('/pacientes', { method: 'POST', body: payload }, withAuth(false));
export const registerProfissional = (payload: any) =>
  fetchJson('/profissionais', { method: 'POST', body: payload }, withAuth(false));

export const getProfissionais = () => fetchJson('/profissionais', {}, withAuth()) as Promise<ProfissionalResponse[]>;

export const getDisponibilidades = (params?: Record<string, any>) =>
  fetchJson(`/disponibilidades${buildQuery(params)}`, {}, withAuth()) as Promise<DisponibilidadeResponse[]>;
export const createDisponibilidade = (payload: any) =>
  fetchJson('/disponibilidades', { method: 'POST', body: payload }, withAuth());
export const deleteDisponibilidade = (id: number) =>
  fetchJson(`/disponibilidades/${id}`, { method: 'DELETE' }, withAuth());

export const getConsultasByPaciente = (pacienteId: number) =>
  fetchJson(`/consultas${buildQuery({ pacienteId })}`, {}, withAuth()) as Promise<ConsultaResponse[]>;
export const getConsultasByProfissional = (profissionalId: number) =>
  fetchJson(`/consultas${buildQuery({ profissionalId })}`, {}, withAuth()) as Promise<ConsultaResponse[]>;
export const createConsulta = (payload: ConsultaRequest) =>
  fetchJson('/consultas', { method: 'POST', body: payload }, withAuth()) as Promise<ConsultaResponse>;
export const updateConsultaStatus = (id: number, payload: { status: ConsultaStatus }) =>
  fetchJson(`/consultas/${id}/status`, { method: 'PUT', body: payload }, withAuth()) as Promise<ConsultaResponse>;
