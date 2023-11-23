import { AuthLayout } from '@/components/layout/auth-layout';
import type { ReactNode } from 'react';

export default function RootLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return <AuthLayout>{children}</AuthLayout>;
}
