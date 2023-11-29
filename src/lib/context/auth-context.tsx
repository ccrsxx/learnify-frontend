'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { NEXT_PUBLIC_BACKEND_URL } from '../env';
import type { ReactNode } from 'react';
import type { LoginSchema } from '@/app/(auth)/login/page';
import type { APIResponse } from '../types/api';
import type { User } from '../types/schema';

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginSchema) => Promise<string | null>;
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
        const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = (await response.json()) as APIResponse<User>;

        if (!response.ok) throw new Error(data.message);

        setUser(data.data as User);
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

  const handleLogin = async ({
    emailOrPhoneNumber,
    password
  }: LoginSchema): Promise<string | null> => {
    try {
      const isUsingEmail = emailOrPhoneNumber.includes('@');

      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [isUsingEmail ? 'email' : 'phone_number']: emailOrPhoneNumber,
          password
        })
      });

      const data = (await response.json()) as APIResponse<User>;

      if (!response.ok) {
        const errorMessage =
          response.status === 401
            ? 'Maaf, password salah'
            : response.status === 404
            ? 'Maaf, akun tidak ditemukan'
            : data.message;

        throw new Error(errorMessage);
      }

      setTimeout(() => {
        setUser(data.data as User);
        setToken(data?.data?.token as string);
      }, 3000);

      return null;
    } catch (err) {
      if (err instanceof Error) return err.message;

      return 'Internal server error';
    }
  };

  const handleLogout = (): void => {
    setUser(null);
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
