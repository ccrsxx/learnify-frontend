'use client';

import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useAuth } from '@/lib/context/auth-context';
import { SearchBar } from '../common/search-bar';
import { Button } from '../ui/button';

export function AdminHeader(): JSX.Element {
  const { user, logout } = useAuth();

  const [search, setSearch] = useState('');

  const { name } = user ?? {};

  return (
    <header className=' bg-primary-blue-500'>
      <div className='layout flex items-center justify-between gap-4 p-4 text-white'>
        <h2 className='text-2xl font-bold'>Hi, {name}!</h2>
        <SearchBar
          className='max-w-sm'
          value={search}
          placeholder='Cari'
          onSearchChange={setSearch}
        />
        <Button
          className='clickable flex items-center gap-2 text-xl font-bold'
          onClick={logout}
        >
          <MdLogout />
          Log out
        </Button>
      </div>
    </header>
  );
}
