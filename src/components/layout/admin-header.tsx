'use client';

import { useAuth } from '@/lib/context/auth-context';
import { HeaderProfile } from '../header/header-profile';

export function AdminHeader(): JSX.Element {
  const { user } = useAuth();

  const { name } = user ?? {};

  return (
    <header className=' bg-primary-blue-500'>
      <div className='layout flex items-center justify-between gap-4 p-4 text-white'>
        <h2 className='text-2xl font-bold'>Hi, {name}!</h2>
        <HeaderProfile />
      </div>
    </header>
  );
}
