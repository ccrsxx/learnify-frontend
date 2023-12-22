import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { MdArrowCircleRight } from 'react-icons/md';
import { useAuth } from '@/lib/context/auth-context';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { CourseCard } from '../course/course-card';
import { Button } from '../ui/button';
import { Modal } from './modal';
import type { Course, UserPayment } from '@/lib/types/schema';
import type { APIResponse } from '@/lib/types/api';

type EnrollCourseModalProps = {
  open: boolean;
  course: Course;
  closeModal: () => void;
};

export function EnrollCourseModal({
  open,
  course,
  closeModal
}: EnrollCourseModalProps): JSX.Element {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleEnrollCourse = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/user-payments/free`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            course_id: course.id
          })
        }
      );

      const data = (await response.json()) as APIResponse<UserPayment>;

      if (!response.ok) throw new Error(data.message);

      await queryClient.invalidateQueries({
        queryKey: ['courses']
      });

      toast.success('Berhasil masuk di kelas!');

      closeModal();
    } catch (err) {
      // eslint-disable-next-line no-console
      if (err instanceof Error) console.error(err.message);
      toast.error('Gagal masuk di kelas. Silahkan coba lagi');
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
        <h2 className='text-2xl'>Enroll</h2>
        <p className='text-2xl font-bold text-primary-blue-500'>Kelas Gratis</p>
      </div>
      <CourseCard modal course={course} />
      <Button
        className='clickable mx-auto flex items-center justify-center gap-2 rounded-high
                   bg-primary-blue-500 px-4 py-2 text-lg font-semibold'
        loading={loading}
        onClick={handleEnrollCourse}
      >
        Mulai Belajar Sekarang
        <MdArrowCircleRight className='text-2xl' />
      </Button>
    </Modal>
  );
}
