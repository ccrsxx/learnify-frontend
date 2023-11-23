'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { sleep } from '@/lib/utils';
import { Loading } from '../ui/loading';
import type { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }): JSX.Element {
  const [pending, setPending] = useState(true);

  const { user, loading } = useAuth();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      setPending(true);

      if (user) {
        await sleep(500);
        void replace('/home');
      } else if (!loading) {
        await sleep(500);
        setPending(false);
      }
    };

    void checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading || pending) return <Loading />;

  return <>{children}</>;
}
