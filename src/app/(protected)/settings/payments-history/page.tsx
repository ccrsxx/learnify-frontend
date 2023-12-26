'use client';

import { usePaymentsHistory } from '@/lib/hooks/query/use-payments-history';
import { CourseCard } from '@/components/course/course-card';
import { CourseCardSkeleton } from '@/components/common/skeleton';

export default function PaymentsHistory(): JSX.Element {
  const { data, isLoading } = usePaymentsHistory();

  const paymentsHistory = data?.data;

  return (
    <section className='mx-auto grid w-full max-w-md gap-4 rounded-medium p-6 shadow-low'>
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <CourseCardSkeleton key={i} />)
      ) : paymentsHistory?.length ? (
        <>
          {data?.data.map((payment) => (
            <CourseCard
              course={payment.course}
              payment={payment}
              key={payment.id}
            />
          ))}
        </>
      ) : (
        <section className='flex justify-center'>
          <h1 className='max-w-md p-4 font-medium text-black'>
            Tidak ada riwayat pembayaran
          </h1>
        </section>
      )}
    </section>
  );
}
