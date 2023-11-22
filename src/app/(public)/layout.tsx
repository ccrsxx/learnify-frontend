import '@/styles/globals.scss';

import { Inter } from 'next/font/google';
import { Layout } from '@/components/layout/layout';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link',
  description: 'A simple URL shortener.',
  authors: { name: 'Risal Amin', url: 'https://risalamin.com' },
  generator: 'Next.js',
  openGraph: {
    title: 'Link',
    description: 'A simple URL shortener.',
    determiner: 'auto',
    url: 'https://link.risalamin.com',
    locale: 'en_US',
    siteName: 'risalamin.com',
    images: {
      url: 'https://risalamin.com/api/og?title=Link&description=A%20simple%20URL%20shortener.',
      alt: 'Link',
      type: 'image/png',
      width: 1200,
      height: 600
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ccrsxx',
    creator: '@ccrsxx',
    title: 'Link',
    description: 'A simple URL shortener.',
    images: {
      url: 'https://risalamin.com/api/og?title=Link&description=A%20simple%20URL%20shortener.',
      alt: 'Link'
    }
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
