'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MdArrowCircleRight } from 'react-icons/md';
import { toast, Toaster } from 'react-hot-toast';
import { sleep } from '@/lib/helper';
import { useAuth } from '@/lib/context/auth-context';
import { formatCurrency, formatDate } from '@/lib/format';
import { usePayment } from '@/lib/hooks/use-payment';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { Alert } from '@/components/ui/alert';
import { BackButton } from '@/components/ui/back-arrow';
import { CourseCard } from '@/components/course/course-card';
import { Button } from '@/components/ui/button';
import { CheckoutSkeleton } from '@/components/common/skeleton';
import { PaymentMethod } from '@/components/payments/payment-method';
import type { APIResponse } from '@/lib/types/api';
import type { UserPayment } from '@/lib/types/schema';

export default function Checkout({
  params: { paymentId }
}: {
  params: { paymentId: string };
}): JSX.Element {
  const router = useRouter();

  const { token } = useAuth();
  const { data: paymentData, isLoading: paymentLoading } =
    usePayment(paymentId);

  const [transferBankOpen, setTransferBankOpen] = useState(false);
  const [creditCardOpen, setCreditCardOpen] = useState(false);

  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (): Promise<void> => {
    const notChoosingPaymentMethod = !transferBankOpen && !creditCardOpen;

    if (notChoosingPaymentMethod) {
      toast.error('Silahkan pilih metode pembayaran terlebih dahulu');
      return;
    }

    const usingCreditCard = creditCardOpen && !formRef.current?.checkValidity();

    if (usingCreditCard) {
      toast.error('Silahkan isi form terlebih dahulu');
      formRef.current?.reportValidity();
      return;
    }

    setFormLoading(true);

    const paymentMethod = creditCardOpen ? 'CREDIT_CARD' : 'BANK_TRANSFER';

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/user-payments/${paymentData?.data?.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            payment_method: paymentMethod
          })
        }
      );

      const data = (await response.json()) as APIResponse<UserPayment>;

      if (!response.ok) throw new Error(data.message);

      await toast.promise(sleep(2000), {
        loading: 'Mengalihkan ke halaman sukses',
        success: 'Sedang mengalihkan...',
        error: 'Terjadi kesalahan. Silahkan coba lagi'
      });

      await sleep(1000);

      setAlreadyPaid(true);

      router.replace(`/payments/success/${data.data?.course_id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error instanceof Error) console.error(error.message);

      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    }

    setFormLoading(false);
  };

  if (paymentLoading) return <CheckoutSkeleton />;

  if (!paymentData)
    return (
      <section className='flex justify-center'>
        <h1 className='max-w-md p-4 font-medium text-black'>
          Pembayaran tidak ditemukan
        </h1>
      </section>
    );

  const payment = paymentData.data;
  const course = payment.course;

  const coursePrice = course?.price ?? 0;

  const courseTax = coursePrice * 0.11;
  const courseTotalPrice = coursePrice + courseTax;

  return (
    <main className='layout grid gap-8 py-8'>
      <Toaster position='bottom-center' containerStyle={{ bottom: 24 }} />
      <section className='grid gap-2'>
        <BackButton label='Kembali' />
        <Alert
          variant='error'
          className='mx-auto rounded-medium px-3 py-2 text-black shadow-low'
          message={`Selesaikan pembayaran sebelum ${formatDate(
            new Date(payment.expired_at)
          )}`}
        />
      </section>
      <section className='flex items-start gap-8'>
        <section className='grid gap-4 rounded-medium p-6 text-black shadow-low'>
          <PaymentMethod
            formRef={formRef}
            creditCardOpen={creditCardOpen}
            transferBankOpen={transferBankOpen}
            onCreditCardOpen={setCreditCardOpen}
            onTransferBankOpen={setTransferBankOpen}
          />
        </section>
        <section className='grid w-full max-w-md gap-4 rounded-md p-6 text-black shadow-low'>
          <h1 className='text-xl font-bold'>Pembayaran Kelas</h1>
          <CourseCard payment modal course={course} />
          <div className='flex justify-between gap-2'>
            <div>
              <p className='font-medium'>Harga</p>
              <p className='text-sm'>{formatCurrency(coursePrice)}</p>
            </div>
            <div>
              <p className='font-medium'>PPN 11%</p>
              <p className='text-sm'>{formatCurrency(courseTax)}</p>
            </div>
            <div>
              <p className='font-medium'>Total Bayar</p>
              <p className='text-sm font-bold text-primary-blue-500'>
                {formatCurrency(courseTotalPrice)}
              </p>
            </div>
          </div>
          <Button
            className='clickable mx-auto mt-8 flex items-center gap-2 rounded-high
                       bg-primary-alert-error px-6 py-3 text-white'
            loading={formLoading}
            disabled={alreadyPaid}
            onClick={handleSubmit}
          >
            Bayar dan Ikuti Kelas Selamanya
            <MdArrowCircleRight className='text-xl' />
          </Button>
        </section>
      </section>
    </main>
  );
}
