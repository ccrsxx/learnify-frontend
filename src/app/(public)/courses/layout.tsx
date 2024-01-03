import { Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export default function Layout({
  children
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <>
      <Toaster position='bottom-center' />
      {children}
    </>
  );
}

export const metadata: Metadata = {
  title: 'Kursus | Learnify'
};
