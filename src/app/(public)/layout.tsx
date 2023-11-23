import { Layout } from '@/components/layout/layout';
import type { ReactNode } from 'react';

export default function RootLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return <Layout>{children}</Layout>;
}
