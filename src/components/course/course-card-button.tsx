import { MdDiamond, MdPlayArrow } from 'react-icons/md';
import { formatCurrency } from '@/lib/format';
import { Button } from '../ui/button';
import { CourseProgressBar } from './course-progress-bar';
import type { Course, UserPayment } from '@/lib/types/schema';
import type { ReactNode } from 'react';

export type CourseCardButtonProps = {
  course: Course;
  modal?: boolean;
  payment?: UserPayment;
  homepage?: boolean;
  progress?: boolean;
};

export function CourseCardButton({
  modal,
  payment,
  progress,
  homepage,
  course: { premium, price, total_materials, total_completed_materials }
}: CourseCardButtonProps): ReactNode {
  if (payment) {
    const { status, expired_at } = payment;

    const isCompleted = status === 'COMPLETED';
    const isExpired = !isCompleted && new Date() > new Date(expired_at);
    const isPending = status === 'PENDING' && !isExpired;

    if (isExpired)
      return (
        <Button className='clickable flex items-center gap-1 bg-primary-alert-error px-2 py-1 text-white'>
          <MdDiamond />
          Pembayaran Kadaluarsa
        </Button>
      );

    if (isPending)
      return (
        <Button className='clickable flex items-center gap-1 bg-primary-blue-300 px-2 py-1 text-white'>
          <MdDiamond />
          Menunggu Pembayaran
        </Button>
      );

    return (
      <Button className='clickable flex items-center gap-1 bg-primary-alert-success px-2 py-1 text-white'>
        <MdDiamond />
        Sudah Dibeli
      </Button>
    );
  }

  if (progress)
    return (
      <CourseProgressBar
        total_materials={total_materials}
        total_completed_materials={total_completed_materials as number}
      />
    );

  const needsToShowPrice = (homepage ?? modal) && premium;

  if (needsToShowPrice)
    return (
      <Button className='clickable flex gap-3 bg-primary-blue-300 px-2 py-1 text-white'>
        <div className='flex items-center gap-1'>
          <MdDiamond />
          <p>Beli</p>
        </div>
        <p>{formatCurrency(price)}</p>
      </Button>
    );

  if (premium)
    return (
      <Button className='clickable flex items-center gap-1 bg-primary-blue-300 px-2 py-1 text-white'>
        <MdDiamond />
        Premium
      </Button>
    );

  return (
    <Button className='clickable flex items-center gap-1 bg-primary-blue-300 px-2 py-1 text-white'>
      <MdPlayArrow />
      Mulai Kelas
    </Button>
  );
}
