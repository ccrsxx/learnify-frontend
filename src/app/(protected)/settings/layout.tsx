'use client';

import { Toaster } from 'react-hot-toast';
import { useTabs } from '@/lib/hooks/use-tabs';
import { BackButton } from '@/components/ui/back-arrow';
import { NavTab } from '@/components/ui/tab';
import type { Tab } from '@/lib/hooks/use-tabs';
import type { ReactNode } from 'react';

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const { tabProps } = useTabs({ tabs: settingsTabs });

  return (
    <main className='grid gap-8'>
      <section className='pt-8'>
        <div className='layout grid gap-4'>
          <BackButton label='Kembali ke Beranda' href='/' />
          <NavTab {...tabProps} />
        </div>
        <hr />
      </section>
      {children}
      <Toaster position='bottom-center' />
    </main>
  );
}

const settingsTabs: Tab[] = [
  {
    id: 'settings',
    href: '/settings',
    label: 'Profile Saya'
  },
  {
    id: 'password-reset',
    href: '/settings/password-reset',
    label: 'Ubah Password'
  },
  {
    id: 'payments-history',
    href: '/settings/payments-history',
    label: 'Riwayat Pembayaran'
  }
];
