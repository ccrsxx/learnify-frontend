import { Header } from '@/components/layout/header';
import { ProtectedLayout } from '@/components/layout/protected-layout';
import type { ReactNode } from 'react';

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <ProtectedLayout>
      <Header />
      {children}
    </ProtectedLayout>
  );
}
