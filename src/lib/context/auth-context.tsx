'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import type { ReactNode } from 'react';
import type { User } from '../types/schema/user';

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manageAuth = async (): Promise<void> => {
      setLoading(true);

      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = (await response.json()) as
          | { data: User }
          | { message: string };

        if ('message' in data) throw new Error(data.message);

        setUser(data.data);
        setLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        if (err instanceof Error) console.error(err.message);

        setUser(null);
        setLoading(false);
      }
    };

    void manageAuth();
  }, [token]);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = (await response.json()) as {
        message: string;
        data: User;
      };

      if (!response.ok) throw new Error(data.message);

      setToken(data.data.token);

      return null;
    } catch (err) {
      if (err instanceof Error) return err.message;

      return 'Internal server error';
    }
  };

  const handleLogout = (): void => {
    setToken(null);
  };

  const contextValue: AuthContextType = {
    user,
    token,
    loading,
    login: handleLogin,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
