'use client';

import { z } from 'zod';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sleep } from '@/lib/utils';
import { emailSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SubmitHandler } from 'react-hook-form';

const passwordReset = z.object({
  email: emailSchema
});

type PasswordResetSchema = z.infer<typeof passwordReset>;

export default function Login(): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<PasswordResetSchema>({ resolver: zodResolver(passwordReset) });

  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const onSubmit: SubmitHandler<PasswordResetSchema> = async (
    _data
  ): Promise<void> => {
    setFormLoading(true);
    setErrorServer(null);

    try {
      const errorMessage = await toast.promise(
        sleep(2000).then(() => null),
        {
          loading: 'Mengirim link reset password',
          success: 'Link reset password telah dikirim ke email kamu',
          error: 'Terjadi kesalahan. Silahkan coba lagi'
        }
      );

      if (errorMessage) {
        setFormLoading(false);
        setErrorServer(errorMessage);

        toast.error(errorMessage);

        return;
      }

      setFormLoading(false);

      await sleep(1000);

      toast.dismiss();
    } catch {
      setFormLoading(false);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    }
  };

  const serverEmailError = errorServer?.includes('akun');

  return (
    <div className='mx-auto grid w-full max-w-md gap-6'>
      <h1 className='text-2xl font-bold text-primary-blue-500'>
        Lupa Password
      </h1>
      <form className='grid gap-6' onSubmit={handleSubmit(onSubmit)}>
        <section className='grid gap-4'>
          <Input
            id='email'
            type='text'
            label='Email'
            error={errors.email}
            register={register('email')}
            placeholder='Masukkan email'
            overrideError={serverEmailError}
          />
        </section>
        <Button
          className='rounded-2xl bg-primary-blue-500 p-4 font-medium
                     text-white transition hover:brightness-90'
          type='submit'
          loading={formLoading}
        >
          Kirim Link Reset Password
        </Button>
      </form>
      <p className='mt-2 text-center'>
        Sudah ingat password?{' '}
        <Link
          href='/login'
          className='custom-underline font-bold text-primary-blue-500'
        >
          Masuk disini
        </Link>
      </p>
    </div>
  );
}
