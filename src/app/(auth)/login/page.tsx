'use client';

import { z } from 'zod';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/context/auth-context';
import { sleep } from '@/lib/utils';
import { passwordSchema, emailOrPhoneNumberSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SubmitHandler } from 'react-hook-form';

const loginSchema = z.object({
  password: passwordSchema,
  emailOrPhoneNumber: emailOrPhoneNumberSchema
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function Login(): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginSchema> = async (data): Promise<void> => {
    if (loggedIn) return;

    setFormLoading(true);
    setErrorServer(null);

    try {
      const errorMessage = await login(data);

      if (errorMessage) {
        setFormLoading(false);
        setErrorServer(errorMessage);

        toast.error(errorMessage);

        return;
      }

      setLoggedIn(true);
      setFormLoading(false);

      void toast.promise(sleep(2000), {
        loading: 'Login berhasil, kamu akan dialihkan ke beranda',
        success: 'Sedang mengalihkan',
        error: 'Terjadi kesalahan. Silahkan coba lagi'
      });

      await sleep(3000);

      toast.dismiss();
    } catch {
      setFormLoading(false);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    }
  };

  const serverEmailError = errorServer?.includes('akun');
  const serverPasswordError = errorServer?.includes('password');

  return (
    <div className='mx-auto grid w-full max-w-md gap-6'>
      <h1 className='text-2xl font-bold text-primary-blue-500'>Masuk</h1>
      <form className='grid gap-6' onSubmit={handleSubmit(onSubmit)}>
        <section className='grid gap-4'>
          <Input
            id='emailOrPhoneNumber'
            type='text'
            label='Email atau Nomor Telepon'
            error={errors.emailOrPhoneNumber}
            register={register('emailOrPhoneNumber')}
            placeholder='Masukkan email atau nomor telepon'
            tabIndex={1}
            overrideError={serverEmailError}
          />
          <Input
            id='password'
            type='password'
            label='Password'
            error={errors.password}
            register={register('password')}
            placeholder='Masukkan password'
            tabIndex={2}
            overrideError={serverPasswordError}
          >
            <Link
              href='/password-reset'
              className='custom-underline ml-auto text-sm font-medium text-primary-blue-500'
              tabIndex={4}
            >
              Lupa password?
            </Link>
          </Input>
        </section>
        <Button
          className='rounded-2xl bg-primary-blue-500 p-4 font-medium
                     text-white transition hover:brightness-90'
          type='submit'
          loading={formLoading}
          tabIndex={3}
          disabled={loggedIn}
        >
          Login
        </Button>
      </form>
      <p className='mt-2 text-center'>
        Belum punya akun?{' '}
        <Link
          href='/register'
          className='custom-underline font-bold text-primary-blue-500'
        >
          Daftar disini
        </Link>
      </p>
    </div>
  );
}
