import Link from 'next/link';
import {
  MdStar,
  MdDiamond,
  MdAccessTime,
  MdLibraryBooks
} from 'react-icons/md';
import { RiShieldStarLine } from 'react-icons/ri';
import { formatCurrency } from '@/lib/format';
import { LazyImage } from '../ui/lazy-image';
import { Button } from '../ui/button';
import type { Course } from '@/lib/types/schema';

export function CourseCard({ course }: { course?: Course }): JSX.Element {
  if (!course)
    return (
      <article className='rounded-xl shadow-low'>
        <div className='h-24 w-full animate-pulse rounded-t-md bg-gray-200' />
        <section className='grid justify-items-start gap-2 p-3'>
          <div className='h-4 w-1/3 animate-pulse rounded-3xl bg-gray-200' />
          <div className='h-4 w-1/2 animate-pulse rounded-3xl bg-gray-200' />
          <div className='h-4 w-1/4 animate-pulse rounded-3xl bg-gray-200' />
        </section>
      </article>
    );

  const {
    id,
    name,
    price,
    author,
    rating,
    difficulty,
    course_category: { name: categoryName, image: categoryImage }
  } = course;

  return (
    <article className='grid'>
      <Link className='clickable rounded-xl shadow-low' href={`/courses/${id}`}>
        <LazyImage
          className='h-24 w-full rounded-t-md object-cover'
          width={320}
          height={96}
          src={categoryImage}
          alt={categoryImage}
        />
        <section className='grid justify-items-start gap-3 p-3'>
          <div className='w-full'>
            <div className='flex justify-between'>
              <p className='text-lg font-bold text-primary-blue-500'>
                {categoryName}
              </p>
              <div className='flex items-center gap-1'>
                <MdStar className='text-lg text-yellow-400' />
                <p className='font-medium'>{rating}</p>
              </div>
            </div>
            <h3 className='text-lg font-bold'>{name}</h3>
            <p className='text-sm'>By {author}</p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <div className='flex items-center gap-1'>
              <RiShieldStarLine className='text-primary-alert-success' />
              <p className='lowercase text-primary-blue-500 first-letter:uppercase'>
                {difficulty} level
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <MdLibraryBooks className='text-primary-alert-success' />
              <p>10 modul</p>
            </div>
            <div className='flex items-center gap-1'>
              <MdAccessTime className='text-primary-alert-success' />
              <p>120 menit</p>
            </div>
          </div>
          <Button className='clickable flex gap-4 bg-primary-blue-300 px-2 py-1 text-white'>
            <div className='flex items-center gap-1'>
              <MdDiamond />
              <p>Beli</p>
            </div>
            <p>{formatCurrency(price)}</p>
          </Button>
        </section>
      </Link>
    </article>
  );
}
