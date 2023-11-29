'use client';

import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sleep } from '@/lib/utils';
import { passwordSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SubmitHandler } from 'react-hook-form';

const validationPassword = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword']
  });

type ValidationPasswordSchema = z.infer<typeof validationPassword>;

export default function Login(): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<ValidationPasswordSchema>({
    resolver: zodResolver(validationPassword)
  });

  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<ValidationPasswordSchema> = async (
    _data
  ): Promise<void> => {
    setFormLoading(true);
    setErrorServer(null);

    try {
      const errorMessage = await toast.promise(
        sleep(2000).then(() => null),
        {
          loading: 'Memperoses perubahan password',
          success:
            'Password berhasil diubah. Kamu akan dialihkan ke halaman login',
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

      void router.replace('/login');
    } catch {
      setFormLoading(false);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    }
  };

  const serverEmailError = errorServer?.includes('akun');

  return (
    <div className='mx-auto grid w-full max-w-md gap-6'>
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
            overrideError={serverEmailError}
          />
          <Input
            id='confirmPassword'
            type='password'
            label='Ulangi Password Baru'
            error={errors.confirmPassword}
            register={register('confirmPassword')}
            placeholder='Ulangi password baru'
            overrideError={serverEmailError}
          />
        </section>
        <Button
          className='rounded-2xl bg-primary-blue-500 p-4 font-medium
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
