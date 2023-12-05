import '@/styles/globals.scss';

import { Poppins } from 'next/font/google';
import { AuthContextProvider } from '@/lib/context/auth-context';
import { ReactQueryProvider } from '../lib/context/react-query-context';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700']
});

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <ReactQueryProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Learnify',
  description: 'Tempat belajar yang menyenangkan.',
  authors: { name: 'Risal Amin', url: 'https://risalamin.com' },
  generator: 'Next.js',
  openGraph: {
    title: 'Learnify',
    description: 'Tempat belajar yang menyenangkan.',
    determiner: 'auto',
    url: 'https://link.risalamin.com',
    locale: 'en_US',
    siteName: 'risalamin.com',
    images: {
      url: 'https://risalamin.com/api/og?title=Learnify&description=Tempat%20belajar%20yang%20menyenangkan.',
      alt: 'Learnify',
      type: 'image/png',
      width: 1200,
      height: 600
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ccrsxx',
    creator: '@ccrsxx',
    title: 'Learnify',
    description: 'Tempat belajar yang menyenangkan.',
    images: {
      url: 'https://risalamin.com/api/og?title=Learnify&description=Tempat%20belajar%20yang%20menyenangkan.',
      alt: 'Learnify'
    }
  }
};
