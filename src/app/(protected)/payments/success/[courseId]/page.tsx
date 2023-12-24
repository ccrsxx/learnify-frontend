'use client';

import Link from 'next/link';
import { Alert } from '@/components/ui/alert';
import { LazyImage } from '@/components/ui/lazy-image';

export default function Success({
  params: { courseId }
}: {
  params: { courseId: string };
}): JSX.Element {
  return (
    <main className='layout grid gap-8 py-8'>
      <section className='grid'>
        <Alert
          className='mx-auto rounded-medium px-3 py-2 text-black shadow-low'
          variant='success'
          message='Terimakasih atas pembayaran transaksi'
        />
      </section>
      <section className='grid gap-16 text-black'>
        <section className='grid justify-items-center gap-8'>
          <h1 className='text-4xl font-bold text-primary-blue-500'>Selamat!</h1>
          <LazyImage
            src='/assets/congratulations.svg'
            className='h-48 w-48'
            alt='Selamat'
            width={192}
            height={192}
          />
          <div className='grid gap-2 text-center'>
            <p className='font-bold'>
              Transaksi pembayaran kelas premium berhasil!
            </p>
            <p className='font-medium'>E-receipt telah dikirimkan ke email.</p>
          </div>
        </section>
        <section className='mx-auto grid gap-4 text-center'>
          <Link
            className='clickable rounded-high bg-primary-blue-500 px-24 py-3 font-bold text-white'
            href={`/courses/${courseId}`}
          >
            Mulai Belajar
          </Link>
          <Link
            className='custom-underline font-bold text-primary-blue-300'
            href='/'
          >
            Kembali ke Beranda
          </Link>
        </section>
      </section>
    </main>
  );
}
