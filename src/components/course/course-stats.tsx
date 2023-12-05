import { clsx } from 'clsx';
import { MdAccessTime, MdLibraryBooks } from 'react-icons/md';
import { RiShieldStarLine } from 'react-icons/ri';
import { CourseRating } from './course-rating';
import type { Course } from '@/lib/types/schema';

type CourseStatsProps = {
  course: Course;
  details?: boolean;
};

export function CourseStats({
  course,
  details
}: CourseStatsProps): JSX.Element {
  const {
    name,
    rating,
    author,
    difficulty,
    total_duration,
    total_materials,
    course_category: { name: categoryName }
  } = course;

  const NameTag = details ? 'h3' : 'h1';

  return (
    <section className='grid w-full gap-2'>
      <div className={clsx(details && 'grid gap-1')}>
        <div className='flex justify-between'>
          <p
            className={clsx(
              'font-bold text-primary-blue-500',
              details ? 'text-2xl' : 'text-lg'
            )}
          >
            {categoryName}
          </p>
          <CourseRating rating={rating} />
        </div>
        <NameTag
          className={clsx('font-bold', details ? 'text-2xl' : 'text-xl')}
        >
          {name}
        </NameTag>
        <p className={clsx('font-medium', details ? 'text-base' : 'text-sm')}>
          By {author}
        </p>
      </div>
      <div
        className={clsx(
          'flex flex-wrap',
          details ? 'gap-6 text-base' : 'gap-3 text-sm'
        )}
      >
        <div className='flex items-center gap-1 font-medium'>
          <RiShieldStarLine className='text-primary-alert-success' />
          <p className='lowercase text-primary-blue-500 first-letter:uppercase'>
            {difficulty} level
          </p>
        </div>
        <div className='flex items-center gap-1'>
          <MdLibraryBooks className='text-primary-alert-success' />
          <p>{total_materials} modul</p>
        </div>
        <div className='flex items-center gap-1'>
          <MdAccessTime className='text-primary-alert-success' />
          <p>{total_duration} menit</p>
        </div>
      </div>
    </section>
  );
}
