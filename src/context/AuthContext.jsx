import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SESSION_STORAGE_KEYS } from '../services/api';

const initialValue = { user: null, login: () => {}, logout: () => {} };
const AuthContext = createContext(initialValue);

const readFromStorage = () => {
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readFromStorage());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user) {
      Object.values(SESSION_STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
      return;
    }
    window.localStorage.setItem(SESSION_STORAGE_KEYS.userId, String(user.userId));
    window.localStorage.setItem(SESSION_STORAGE_KEYS.role, user.role);
    window.localStorage.setItem(SESSION_STORAGE_KEYS.nome, user.nome || '');
    window.localStorage.setItem(SESSION_STORAGE_KEYS.email, user.email || '');
    if (user.pacienteId) {
      window.localStorage.setItem(SESSION_STORAGE_KEYS.pacienteId, String(user.pacienteId));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEYS.pacienteId);
    }
    if (user.profissionalId) {
      window.localStorage.setItem(SESSION_STORAGE_KEYS.profissionalId, String(user.profissionalId));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEYS.profissionalId);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login: (payload) => setUser(payload),
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
