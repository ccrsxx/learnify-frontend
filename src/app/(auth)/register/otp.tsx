import OtpInput from 'react-otp-input';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useCountdown } from '@/lib/hooks/use-countdown';
import { sleep } from '@/lib/helper';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { BackButton } from '@/components/ui/back-arrow';
import { Button } from '@/components/ui/button';
import type { FormEvent } from 'react';

type OtpProps = {
  email: string;
  onTabChange: (newTab: 'form' | 'otp', email?: string) => void;
};

export function Otp({ email, onTabChange }: OtpProps): JSX.Element {
  const router = useRouter();

  const { seconds, reset } = useCountdown(60);

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const [errorServer, setErrorServer] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    setErrorServer(null);

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/auth/otp/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp, email })
        }
      );

      if (!response.ok) {
        const errorMessage =
          response.status === 401
            ? 'Maaf, Kode OTP Salah'
            : 'Terjadi kesalahan. Silahkan coba lagi';

        toast.error(errorMessage);
        setErrorServer(errorMessage);

        return;
      }

      await toast.promise(sleep(2000), {
        loading: 'Registrasi berhasil, kamu akan dialihkan ke halaman login',
        success: 'Sedang mengalihkan',
        error: 'Terjadi kesalahan. Silahkan coba lagi'
      });

      await sleep(1000);

      toast.dismiss();

      router.replace('/login');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (): Promise<void> => {
    setLoading(true);
    setErrorServer(null);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorMessage = 'Terjadi kesalahan. Silahkan coba lagi';

        toast.error(errorMessage);
        setErrorServer(errorMessage);

        return;
      }

      toast.success('Berhasil mengirim ulang OTP');

      reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  const timeoutFinished = seconds === 0;

  const serverOtpError = errorServer?.includes('OTP');

  const emailProvider = '@' + email.split('@').pop();
  const maskedEmail = email.at(0) + '*'.repeat(7) + emailProvider;

  return (
    <div className='grid gap-6'>
      <BackButton
        label='Kembali ke Register'
        onClick={() => onTabChange('form')}
      />
      <h1 className='text-2xl font-bold text-primary-blue-500'>Masukkan OTP</h1>
      <form className='grid gap-6' onSubmit={handleSubmit}>
        <p>Ketik 6 digit kode yang dikirimkan ke {maskedEmail}</p>
        <OtpInput
          value={otp}
          numInputs={6}
          inputType='tel'
          containerStyle='flex justify-center gap-4'
          inputStyle={clsx(
            '!h-10 !w-10 p-2 custom-input',
            serverOtpError && 'border-red-500'
          )}
          renderInput={(props) => <input {...props} disabled={loading} />}
          onChange={setOtp}
        />
        <Button
          className='custom-underline font-semibold text-primary-alert-error
                     !ring-0 disabled:text-current disabled:no-underline disabled:opacity-50'
          disabled={!timeoutFinished || loading}
          onClick={resendOtp}
        >
          {timeoutFinished
            ? 'Kirim ulang OTP'
            : `Kirim ulang OTP dalam ${seconds} detik`}
        </Button>
        <Button
          type='submit'
          className='mt-4 rounded-medium bg-primary-blue-500 p-4 font-medium
                     text-white transition hover:brightness-90 disabled:brightness-75'
          loading={loading}
          disabled={otp.length !== 6}
        >
          Simpan
        </Button>
      </form>
    </div>
  );
}
