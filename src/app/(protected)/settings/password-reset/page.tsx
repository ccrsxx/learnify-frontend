'use client';

import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@/lib/validation';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { useAuth } from '@/lib/context/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { SubmitHandler } from 'react-hook-form';

const passwordResetProfileSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema
  })
  .refine(({ oldPassword, newPassword }) => oldPassword !== newPassword, {
    message: 'Password baru tidak boleh sama dengan password lama',
    path: ['newPassword']
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: 'Password tidak sama',
      path: ['confirmNewPassword']
    }
  );

type PasswordResetProfileSchema = z.infer<typeof passwordResetProfileSchema>;

export default function PasswordResetProfile(): JSX.Element {
  const { token } = useAuth();

  const {
    formState: { errors },
    reset,
    register,
    handleSubmit
  } = useForm<PasswordResetProfileSchema>({
    resolver: zodResolver(passwordResetProfileSchema)
  });

  const [formLoading, setFormLoading] = useState(false);
  const [errorServer, setErrorServer] = useState<string | null>(null);

  const onSubmit: SubmitHandler<PasswordResetProfileSchema> = async ({
    oldPassword,
    newPassword
  }): Promise<void> => {
    setFormLoading(true);
    setErrorServer(null);

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/users/me/password-reset`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword
          })
        }
      );

      if (!response.ok) {
        const errorMessage =
          response.status === 401
            ? 'Maaf, password lama salah'
            : 'Terjadi kesalahan. Silahkan coba lagi';

        toast.error(errorMessage);
        setErrorServer(errorMessage);

        return;
      }

      reset();

      toast.success('Password berhasil diubah');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    } finally {
      setFormLoading(false);
    }
  };

  const serverOldPasswordError = errorServer?.includes('lama');

  return (
    <section className='mx-auto w-full max-w-md rounded-medium p-6 shadow-low'>
      <form className='grid w-full gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          id='oldPassword'
          type='password'
          label='Password Lama'
          error={errors.oldPassword}
          disabled={formLoading}
          placeholder='Masukkan password lama'
          overrideError={serverOldPasswordError}
          register={register('oldPassword')}
        />
        <Input
          id='newPassword'
          type='password'
          label='Password Baru'
          error={errors.newPassword}
          disabled={formLoading}
          placeholder='Masukkan password baru'
          register={register('newPassword')}
        />
        <Input
          id='confirmNewPassword'
          type='password'
          label='Konfirmasi Password Baru'
          error={errors.confirmNewPassword}
          disabled={formLoading}
          placeholder='Masukkan konfirmasi password baru'
          register={register('confirmNewPassword')}
        />
        <Button
          type='submit'
          loading={formLoading}
          className='mt-2 rounded-high bg-primary-blue-500 px-4 py-3'
        >
          Simpan
        </Button>
      </form>
    </section>
  );
}
