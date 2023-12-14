'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MdArrowCircleRight } from 'react-icons/md';
import { toast, Toaster } from 'react-hot-toast';
import { useCourse } from '@/lib/hooks/use-course';
import { sleep } from '@/lib/helper';
import { formatCurrency, formatDate } from '@/lib/format';
import { Alert } from '@/components/ui/alert';
import { BackButton } from '@/components/ui/back-arrow';
import { CourseCard } from '@/components/course/course-card';
import { Button } from '@/components/ui/button';
import { CourseCardSkeleton } from '@/components/common/skeleton';
import { PaymentMethod } from '@/components/payment/payment-method';
import type { Course } from '@/lib/types/schema';

export default function Checkout({
  params: { courseId }
}: {
  params: { courseId: string };
}): JSX.Element {
  const router = useRouter();
  const { data: courseData, isLoading: courseLoading } = useCourse(courseId);

  const [transferBankOpen, setTransferBankOpen] = useState(false);
  const [creditCardOpen, setCreditCardOpen] = useState(false);

  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

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

    setPaymentLoading(true);

    try {
      const redirectUrl = await toast.promise(
        sleep(2000).then(() => `/checkout/success/${course?.id}`),
        {
          loading: 'Sedang memproses pembayaran',
          success: 'Pembayaran berhasil',
          error: 'Terjadi kesalahan. Silahkan coba lagi'
        }
      );

      await sleep(1000);

      setAlreadyPaid(true);
      setPaymentLoading(false);

      router.replace(redirectUrl);
    } catch (error) {
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
      setPaymentLoading(false);
    }
  };

  const course = courseData?.data;

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
            new Date(Date.now() + 86400000)
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
          {courseLoading ? (
            <CourseCardSkeleton />
          ) : (
            <CourseCard payment modal course={course as Course} />
          )}
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
            loading={paymentLoading}
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
