'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { sleep } from '@/lib/utils';
import { Placeholder } from '../common/placeholder';
import type { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pending, setPending] = useState(true);

  const { user, loading } = useAuth();

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      setPending(true);

      const inAdminLogin = pathname === '/login/admin';

      const checkAuth = inAdminLogin ? user?.admin : user;

      if (user && checkAuth) {
        await sleep(500);
        const redirect = searchParams.get('redirect');
        router.replace(redirect ?? '/');
      } else if (!loading) {
        await sleep(500);
        setPending(false);
      }
    };

    void checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading || pending) return <Placeholder />;

  return <>{children}</>;
}
