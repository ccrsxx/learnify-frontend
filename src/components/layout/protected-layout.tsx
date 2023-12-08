'use client';

import { useRequireAuth } from '@/lib/hooks/use-require-auth';
import { Placeholder } from '../common/placeholder';
import type { PropsWithChildren } from 'react';

type ProtectedLayoutProps = PropsWithChildren<{
  admin?: boolean;
}>;

export function ProtectedLayout({
  admin,
  children
}: ProtectedLayoutProps): JSX.Element {
  const user = useRequireAuth({
    admin: !!admin,
    redirect: admin ? '/login/admin' : '/login'
  });

  if (!user) return <Placeholder />;

  return <>{children}</>;
}
