'use client';

import { z } from 'zod';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneNumberSchema
} from '@/lib/validation';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { sleep } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { User } from '@/lib/types/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { APIResponse } from '@/lib/types/api';

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone_number: phoneNumberSchema
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Login(): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterSchema> = async (
    data
  ): Promise<void> => {
    setFormLoading(true);
    setErrorServer(null);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const { message } = (await response.json()) as APIResponse<User>;

      if (!response.ok) {
        const errorMessage = message.includes('Email')
          ? 'Maaf, email sudah digunakan'
          : message.includes('Phone')
          ? 'Maaf, nomor telepon sudah digunakan'
          : message;

        setFormLoading(false);
        setErrorServer(errorMessage);

        toast.error(errorMessage);

        return;
      }

      setFormLoading(false);

      await toast.promise(sleep(2000), {
        loading: 'Registrasi berhasil, kamu akan dialihkan ke halaman login',
        success: 'Sedang mengalihkan',
        error: 'Terjadi kesalahan. Silahkan coba lagi'
      });

      await sleep(1000);

      toast.dismiss();

      void router.replace('/login');
    } catch {
      setFormLoading(false);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    }
  };

  const serverEmailError = errorServer?.includes('email');
  const serverPhoneNumberError = errorServer?.includes('nomor');

  return (
    <div className='mx-auto grid w-full max-w-md gap-6'>
      <h1 className='text-2xl font-bold text-primary-blue-500'>Daftar</h1>
      <form
        className='grid gap-6'
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className='grid gap-4'>
          <Input
            id='name'
            type='text'
            label='Nama'
            error={errors.name}
            register={register('name')}
            placeholder='Masukkan nama'
          />
          <Input
            id='phone_number'
            type='text'
            label='Nomor Telepon'
            error={errors.phone_number}
            register={register('phone_number')}
            placeholder='Masukkan Nomor Telepon'
            overrideError={serverPhoneNumberError}
          />
          <Input
            id='email'
            type='text'
            label='Email'
            error={errors.email}
            register={register('email')}
            placeholder='Masukkan email'
            overrideError={serverEmailError}
          />
          <Input
            id='password'
            type='password'
            label='Password'
            error={errors.password}
            register={register('password')}
            placeholder='Masukkan password'
          />
        </section>
        <Button
          className='rounded-medium bg-primary-blue-500 p-4 font-medium
                     text-white transition hover:brightness-90'
          type='submit'
          loading={formLoading}
        >
          Daftar
        </Button>
      </form>
      <p className='mt-2 text-center'>
        Sudah punya akun?{' '}
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
