const DEFAULT_API = 'https://hc-teleonsulta-api-java.onrender.com';
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
  const body = await response.text();
  return {
    status: response.status,
    message: STATUS_MESSAGES[response.status as keyof typeof STATUS_MESSAGES] || 'Erro no servidor',
    body,
  };
};

export async function fetchJson(path: string, options: RequestInit = {}, { requireAuth = true } = {}) {
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

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    body:
      options.body && typeof options.body === 'object' && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
  };

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
}

const withAuth = (requireAuth = true) => ({ requireAuth });

// Auth e cadastro
export const login = (payload: any) => fetchJson('/auth/login', { method: 'POST', body: payload }, withAuth(false));
export const registerPaciente = (payload: any) =>
  fetchJson('/pacientes', { method: 'POST', body: payload }, withAuth(false));
export const registerProfissional = (payload: any) =>
  fetchJson('/profissionais', { method: 'POST', body: payload }, withAuth(false));

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

// Profissionais auxiliares
export const getProfissionais = () => fetchJson('/profissionais', {}, withAuth());

// Disponibilidades
export const getDisponibilidades = (params?: Record<string, any>) =>
  fetchJson(`/disponibilidades${buildQuery(params)}`, {}, withAuth());
export const createDisponibilidade = (payload: any) =>
  fetchJson('/disponibilidades', { method: 'POST', body: payload }, withAuth());
export const deleteDisponibilidade = (id: number) =>
  fetchJson(`/disponibilidades/${id}`, { method: 'DELETE' }, withAuth());

// Consultas
export const getConsultasByPaciente = (pacienteId: number) =>
  fetchJson(`/consultas${buildQuery({ pacienteId })}`, {}, withAuth());
export const getConsultasByProfissional = (profissionalId: number) =>
  fetchJson(`/consultas${buildQuery({ profissionalId })}`, {}, withAuth());
export const createConsulta = (payload: any) => fetchJson('/consultas', { method: 'POST', body: payload }, withAuth());
export const updateConsultaStatus = (id: number, payload: any) =>
  fetchJson(`/consultas/${id}/status`, { method: 'PUT', body: payload }, withAuth());
