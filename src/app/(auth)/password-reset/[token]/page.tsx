'use client';

import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sleep } from '@/lib/helper';
import { passwordSchema } from '@/lib/validation';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import type { SubmitHandler } from 'react-hook-form';
import type { APIResponse } from '@/lib/types/api';

const passwordResetValidationSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword']
  });

type PasswordResetValidationSchema = z.infer<
  typeof passwordResetValidationSchema
>;

export default function PasswordResetToken({
  params: { token }
}: {
  params: { token: string };
}): JSX.Element {
  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<PasswordResetValidationSchema>({
    resolver: zodResolver(passwordResetValidationSchema)
  });

  const [formLoading, setFormLoading] = useState(false);
  const [validationLoading, setValidationLoading] = useState(true);

  useEffect(() => {
    const checkToken = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${NEXT_PUBLIC_BACKEND_URL}/auth/password-reset/${token}`
        );

        const data = (await response.json()) as APIResponse;

        if (!response.ok) throw new Error(data.message);

        await sleep(3000);

        setValidationLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        toast.error('Tautan invalid atau kadaluarsa');

        router.replace('/login');
      }
    };

    void checkToken();
  }, [token, router]);

  const onSubmit: SubmitHandler<PasswordResetValidationSchema> = async ({
    password
  }): Promise<void> => {
    setFormLoading(true);

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/auth/password-reset`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password })
        }
      );

      const data = (await response.json()) as APIResponse;

      if (!response.ok) throw new Error(data.message);

      setFormLoading(false);

      await toast.promise(sleep(2000), {
        loading:
          'Password berhasil diubah, kamu akan dialihkan ke halaman login',
        success: 'Sedang mengalihkan',
        error: 'Terjadi kesalahan. Silahkan coba lagi'
      });

      await sleep(1000);

      toast.dismiss();

      router.replace('/login');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setFormLoading(false);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    }
  };

  if (validationLoading)
    return (
      <div className='grid place-items-center gap-6'>
        <h1 className='text-2xl font-bold text-primary-blue-500'>
          Reset Password
        </h1>
        <Loading />
        <p>Sedang memvalidasi tautan...</p>
      </div>
    );

  return (
    <div className='mx-auto grid w-full max-w-lg gap-6'>
      <h1 className='text-2xl font-bold text-primary-blue-500'>
        Reset Password
      </h1>
      <form className='grid gap-6' onSubmit={handleSubmit(onSubmit)}>
        <section className='grid gap-4'>
          <Input
            id='password'
            type='password'
            label='Masukkan Password Baru'
            error={errors.password}
            register={register('password')}
            placeholder='Masukkan password baru'
          />
          <Input
            id='confirmPassword'
            type='password'
            label='Ulangi Password Baru'
            error={errors.confirmPassword}
            register={register('confirmPassword')}
            placeholder='Ulangi password baru'
          />
        </section>
        <Button
          className='rounded-medium bg-primary-blue-500 p-4 font-medium
                     text-white transition hover:brightness-90'
          type='submit'
          loading={formLoading}
        >
          Simpan
        </Button>
      </form>
    </div>
  );
}
