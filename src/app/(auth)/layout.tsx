import { Toaster } from 'react-hot-toast';
import { AuthLayout } from '@/components/layout/auth-layout';
import { Logo } from '@/components/common/logo';
import type { ReactNode } from 'react';

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <AuthLayout>
      <main className='grid min-h-screen xl:grid-cols-12'>
        <section className='col-span-6 grid content-center p-4 text-black'>
          {children}
          <Toaster
            containerStyle={{
              top: 48,
              position: 'relative',
              textAlign: 'center'
            }}
          />
        </section>
        <section className='col-span-6 hidden content-center justify-center bg-primary-blue-500 xl:grid'>
          <Logo className='text-6xl' />
        </section>
      </main>
    </AuthLayout>
  );
}
