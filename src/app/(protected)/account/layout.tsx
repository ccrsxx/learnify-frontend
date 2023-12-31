import AccountLayout from './account-layout';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export default function Layout({
  children
}: {
  children: ReactNode;
}): ReactNode {
  return <AccountLayout>{children}</AccountLayout>;
}

export const metadata: Metadata = {
  title: 'Profile Saya | Learnify'
};
