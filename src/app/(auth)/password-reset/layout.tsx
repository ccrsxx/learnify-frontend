import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export default function Layout({
  children
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}

export const metadata: Metadata = {
  title: 'Lupa Password | Learnify'
};
