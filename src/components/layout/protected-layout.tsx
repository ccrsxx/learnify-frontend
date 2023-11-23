'use client';

import { useRequireAuth } from '@/lib/hooks/use-require-auth';
import { Loading } from '../ui/loading';
import type { ReactNode } from 'react';

export function ProtectedLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <Loading />;

  return <>{children}</>;
}
