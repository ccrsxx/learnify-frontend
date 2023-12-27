'use client';

import { z } from 'zod';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneNumberSchema
} from '@/lib/validation';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
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

type RegisterFormProps = {
  onTabChange: (newTab: 'form' | 'otp', email?: string) => void;
};

export function RegisterForm({ onTabChange }: RegisterFormProps): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

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
          : 'Terjadi kesalahan. Silahkan coba lagi';

        setFormLoading(false);
        setErrorServer(errorMessage);

        toast.error(errorMessage);

        return;
      }

      onTabChange('otp', data.email);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    } finally {
      setFormLoading(false);
    }
  };

  const serverEmailError = errorServer?.includes('email');
  const serverPhoneNumberError = errorServer?.includes('nomor');

  return (
    <div className='mx-auto w-full max-w-lg'>
      <div className='grid gap-6'>
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
              disabled={formLoading}
              register={register('name')}
              placeholder='Masukkan nama'
            />
            <Input
              id='phone_number'
              type='text'
              label='Nomor Telepon'
              error={errors.phone_number}
              disabled={formLoading}
              register={register('phone_number')}
              placeholder='Masukkan nomor telepon'
              overrideError={serverPhoneNumberError}
            />
            <Input
              id='email'
              type='email'
              label='Email'
              error={errors.email}
              disabled={formLoading}
              register={register('email')}
              placeholder='Masukkan email'
              overrideError={serverEmailError}
            />
            <Input
              id='password'
              type='password'
              label='Password'
              error={errors.password}
              disabled={formLoading}
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
    </div>
  );
}
