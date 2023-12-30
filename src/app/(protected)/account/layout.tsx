'use client';

import { Toaster } from 'react-hot-toast';
import { useTabs } from '@/lib/hooks/use-tabs';
import { BackButton } from '@/components/ui/back-arrow';
import { NavTab } from '@/components/ui/nav-tab';
import type { Tab } from '@/lib/hooks/use-tabs';
import type { ReactNode } from 'react';

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const { tabProps } = useTabs({ tabs: settingsTabs });

  return (
    <main>
      <section className='pt-8'>
        <div className='layout grid gap-4 overflow-x-auto'>
          <BackButton label='Kembali ke Beranda' href='/' />
          <NavTab {...tabProps} />
        </div>
        <hr />
      </section>
      <section className='px-4 py-8'>{children}</section>
      <Toaster position='bottom-center' />
    </main>
  );
}

const settingsTabs: Tab[] = [
  {
    id: 'settings',
    href: '/account',
    label: 'Profile Saya'
  },
  {
    id: 'password-reset',
    href: '/account/password-reset',
    label: 'Ubah Password'
  },
  {
    id: 'payments-history',
    href: '/account/payments-history',
    label: 'Riwayat Pembayaran'
  }
];
