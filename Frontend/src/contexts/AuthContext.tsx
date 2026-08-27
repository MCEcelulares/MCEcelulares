'use client';

import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

interface User {
  id: number;
  nome: string;
  permissoes: string[];
}

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User | null;
  login: (token: string, id: number, nome: string, permissoes: string[]) => void;
  logout: () => void;
  updateNome: (nome: string) => void;
  hasPermissao: (permissao: string) => boolean;
  hasAnyPermissao: (permissoes: string[]) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nome_usuario');
    localStorage.removeItem('permissoes');

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUserId = localStorage.getItem('id_usuario');
    const savedNome = localStorage.getItem('nome_usuario');
    const savedPermissoes = localStorage.getItem('permissoes');

    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
      setUser(
        savedUserId
          ? {
              id: Number(savedUserId),
              nome: savedNome ?? '',
              permissoes: savedPermissoes ? JSON.parse(savedPermissoes) : [],
            }
          : null
      );
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
      window.location.href = '/login';
    };

    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [logout]);

  const login = useCallback((token: string, id: number, nome: string, permissoes: string[]) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('id_usuario', String(id));
    localStorage.setItem('nome_usuario', nome);
    localStorage.setItem('permissoes', JSON.stringify(permissoes));

    setToken(token);
    setUser({ id, nome, permissoes });
    setIsAuthenticated(true);
  }, []);

  const updateNome = useCallback((nome: string) => {
    localStorage.setItem('nome_usuario', nome);
    setUser((prev) => (prev ? { ...prev, nome } : prev));
  }, []);

  const hasPermissao = useCallback(
    (permissao: string) => user?.permissoes?.includes(permissao) ?? false,
    [user]
  );

  const hasAnyPermissao = useCallback(
    (permissoes: string[]) => permissoes.some((p) => user?.permissoes?.includes(p)) ?? false,
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, token, user, login, logout, updateNome, hasPermissao, hasAnyPermissao }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);