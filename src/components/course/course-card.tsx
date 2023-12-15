import Link from 'next/link';
import { clsx } from 'clsx';
import { MdDiamond, MdPlayArrow } from 'react-icons/md';
import { formatCurrency } from '@/lib/format';
import { LazyImage } from '../ui/lazy-image';
import { Button } from '../ui/button';
import { CourseStats } from './course-stats';
import type { Course } from '@/lib/types/schema';

type CourseCardProps = {
  course: Course;
  modal?: boolean;
  payment?: boolean;
  details?: boolean;
  homepage?: boolean;
};

export function CourseCard({
  modal,
  course,
  payment,
  details,
  homepage
}: CourseCardProps): JSX.Element {
  const {
    id,
    name,
    price,
    image,
    premium,
    course_category: { image: categoryImage }
  } = course;

  return (
    <article className='grid'>
      <Link
        className={clsx(
          'rounded-medium bg-white shadow-low',
          modal ? 'pointer-events-none' : 'clickable'
        )}
        href={`/courses/${id}`}
        tabIndex={modal ? -1 : undefined}
      >
        <LazyImage
          className='h-24 w-full rounded-t-medium object-cover'
          width={320}
          height={96}
          src={image ?? categoryImage}
          alt={name}
        />
        <section className='grid justify-items-start gap-3 p-3 text-black'>
          <CourseStats course={course} details={details} payment={payment} />
          {!payment &&
            ((homepage ?? modal) && premium ? (
              <Button className='clickable flex gap-3 bg-primary-blue-300 px-2 py-1 text-white'>
                <div className='flex items-center gap-1'>
                  <MdDiamond />
                  <p>Beli</p>
                </div>
                <p>{formatCurrency(price)}</p>
              </Button>
            ) : premium ? (
              <Button
                className='clickable flex items-center gap-1 
                          bg-primary-blue-300 px-2 py-1 text-white'
              >
                <MdDiamond />
                Premium
              </Button>
            ) : (
              <Button
                className='clickable flex items-center gap-1 
                          bg-primary-blue-300 px-2 py-1 text-white'
              >
                <MdPlayArrow />
                Mulai Kelas
              </Button>
            ))}
        </section>
      </Link>
    </article>
  );
}
