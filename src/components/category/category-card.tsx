import Link from 'next/link';
import { LazyImage } from '../ui/lazy-image';
import type { CourseCategory } from '@/lib/types/schema';

export function CategoryCard({
  category: { name, image }
}: {
  category: CourseCategory;
}): JSX.Element {
  return (
    <article className='grid'>
      <Link className='clickable grid gap-2' href={`/courses?category=${name}`}>
        <LazyImage
          className='h-24 w-full rounded-high'
          width={160}
          height={96}
          src={image}
          alt={name}
        />
        <h3 className='text-center text-sm font-medium'>{name}</h3>
      </Link>
    </article>
  );
}
