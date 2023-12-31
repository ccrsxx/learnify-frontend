'use client';

import { useAuth } from '@/lib/context/auth-context';
import { HeaderProfile } from '../header/header-profile';
import { Logo } from '../common/logo';

export function AdminHeader(): JSX.Element {
  const { user } = useAuth();

  const { name } = user!;

  return (
    <header className='sticky top-0 bg-primary-blue-500'>
      <div className='layout flex items-center justify-between gap-4 p-4 text-white'>
        <div className='flex items-center gap-4'>
          <Logo clickable noText />
          <h2 className='text-2xl font-bold'>Hi, {name}!</h2>
        </div>
        <HeaderProfile />
      </div>
    </header>
  );
}
