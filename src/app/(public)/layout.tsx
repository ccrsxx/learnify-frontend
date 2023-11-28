import { Header } from '@/components/layout/header';
import type { ReactNode } from 'react';

export default function RootLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
