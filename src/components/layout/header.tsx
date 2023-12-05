'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Logo } from '../common/logo';
import { SearchBar } from '../common/search-bar';
import { Button } from '../ui/button';

export function Header(): JSX.Element {
  const { user, loading, logout } = useAuth();

  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmedSearch = search.trim();

    const params = new URLSearchParams();

    if (trimmedSearch) params.set('search', trimmedSearch);
    else params.delete('search');

    window.location.href = `/courses?${params.toString()}`;
  };

  return (
    <header className='bg-primary-blue-500'>
      <div className='layout flex w-full items-center gap-8 p-4'>
        <Logo clickable />
        <form className='w-full' onSubmit={handleSubmit}>
          <SearchBar value={search} onSearchChange={setSearch} />
        </form>
        <div
          className={clsx(
            'ml-auto opacity-0 transition-opacity',
            !loading && 'opacity-100'
          )}
        >
          {loading ? null : user ? (
            <Button
              className='clickable flex items-center gap-2 text-xl font-bold'
              onClick={logout}
            >
              <MdLogout />
              Log out
            </Button>
          ) : (
            <Link
              href='/login'
              className='clickable flex items-center gap-2 text-xl font-bold'
            >
              <MdLogin />
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
