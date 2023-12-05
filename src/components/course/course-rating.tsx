import { MdStar } from 'react-icons/md';
import type { Course } from '@/lib/types/schema';

export function CourseRating({ rating }: Pick<Course, 'rating'>): JSX.Element {
  return (
    <div className='flex items-center gap-1'>
      <MdStar className='text-lg text-yellow-400' />
      <p className='font-medium'>{rating}</p>
    </div>
  );
}
