import Link from 'next/link';
import { MdArrowCircleRight } from 'react-icons/md';
import { CourseCard } from '../course/course-card';
import { Modal } from './modal';
import type { Course } from '@/lib/types/schema';

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
  return (
    <Modal
      modalClassName='max-w-lg bg-white w-full p-8 rounded-medium grid gap-8'
      open={open}
      closeModal={closeModal}
    >
      <div className='grid gap-1 text-center font-bold text-black'>
        <h2 className='text-2xl'>Selangkah lagi menuju</h2>
        <p className='text-2xl font-bold text-primary-blue-500'>
          Kelas Premium
        </p>
      </div>
      <CourseCard modal course={course} />
      <Link
        href={`/checkout/${course.id}`}
        className='clickable mx-auto flex items-center justify-center gap-2 rounded-high
                   bg-primary-blue-500 px-6 py-3 text-lg font-semibold'
      >
        Beli Sekarang
        <MdArrowCircleRight className='text-2xl' />
      </Link>
    </Modal>
  );
}
