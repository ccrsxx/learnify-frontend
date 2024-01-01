import DashboardLayout from './dashboard-layout';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export default function Layout({
  children
}: {
  children: ReactNode;
}): ReactNode {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export const metadata: Metadata = {
  title: 'Dashboard | Learnify'
};
