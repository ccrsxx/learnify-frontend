import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { MdArrowCircleRight } from 'react-icons/md';
import { useAuth } from '@/lib/context/auth-context';
import { sleep } from '@/lib/helper';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { CourseCard } from '../course/course-card';
import { Button } from '../ui/button';
import { Modal } from './modal';
import type { Course, UserPayment } from '@/lib/types/schema';
import type { APIResponse } from '@/lib/types/api';

type PurchaseCourseModalProps = {
  open: boolean;
  course: Course;
  closeModal: () => void;
};

export function PurchaseCourseModal({
  open,
  course,
  closeModal
}: PurchaseCourseModalProps): JSX.Element {
  const router = useRouter();

  const { user, token } = useAuth();

  const [loading, setLoading] = useState(false);

  const handlePurchaseCourse = async (): Promise<void> => {
    if (!user) {
      router.push(`/login?redirect=/courses/${course.id}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/user-payments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          course_id: course.id
        })
      });

      const data = (await response.json()) as APIResponse<UserPayment>;

      if (!response.ok) throw new Error(data.message);

      await toast.promise(sleep(2000), {
        loading: 'Mengalihkan ke halaman pembayaran',
        success: 'Sedang mengalihkan',
        error: 'Gagal mengalihkan'
      });

      closeModal();

      await sleep(1000);

      router.push(`/payments/${data.data?.id}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      if (err instanceof Error) console.error(err.message);
      toast.error('Gagal membeli kelas. Silahkan coba lagi');
    }

    setLoading(false);
  };

  return (
    <Modal
      modalClassName='max-w-lg bg-white w-full p-8 rounded-medium grid gap-8'
      open={open}
      closeModal={closeModal}
    >
      <div className='grid gap-1 text-center font-bold text-black'>
        <Dialog.Title className='text-2xl'>Selangkah lagi menuju</Dialog.Title>
        <Dialog.Description className='text-2xl font-bold text-primary-blue-500'>
          Kelas Premium
        </Dialog.Description>
      </div>
      <CourseCard modal course={course} />
      <Button
        className='clickable mx-auto flex items-center justify-center gap-2 rounded-high
                   bg-primary-blue-500 px-4 py-2 text-lg font-semibold'
        loading={loading}
        onClick={handlePurchaseCourse}
      >
        Beli Sekarang
        <MdArrowCircleRight className='text-2xl' />
      </Button>
    </Modal>
  );
}
