import { clsx } from 'clsx';
import { MdAccessTime, MdLibraryBooks } from 'react-icons/md';
import { RiShieldStarLine } from 'react-icons/ri';
import type { Course } from '@/lib/types/schema';

type CourseStatsProps = {
  course: Course;
  details?: boolean;
  showDetails?: boolean;
};

export function CourseStats({
  course,
  details,
  showDetails = true
}: CourseStatsProps): JSX.Element {
  const {
    name,
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
        <p
          className={clsx(
            'font-bold text-primary-blue-500',
            details ? 'text-2xl' : 'text-lg'
          )}
        >
          {categoryName}
        </p>
        <NameTag
          className={clsx('font-bold', details ? 'text-2xl' : 'text-xl')}
        >
          {name}
        </NameTag>
        <p className={clsx('font-medium', details ? 'text-base' : 'text-sm')}>
          By {author}
        </p>
      </div>
      {showDetails && (
        <div
          className={clsx(
            'flex flex-wrap gap-y-2',
            details ? 'gap-x-4 text-base md:gap-x-6' : 'gap-x-3 text-sm'
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
      )}
    </section>
  );
}
