'use client';

import { useRequireAuth } from '@/lib/hooks/use-require-auth';
import { Placeholder } from '../common/placeholder';
import type { ReactNode } from 'react';

export function ProtectedLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}
