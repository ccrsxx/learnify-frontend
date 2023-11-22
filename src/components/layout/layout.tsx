import { Header } from './header';
import { Footer } from './footer';
import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
