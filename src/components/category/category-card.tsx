import Link from 'next/link';
import { LazyImage } from '../ui/lazy-image';
import type { Category } from '@/lib/types/schema';

export function CategoryCard({
  category
}: {
  category?: Category;
}): JSX.Element {
  if (!category)
    return (
      <article className='grid gap-2'>
        <div className='h-24 w-full animate-pulse rounded-3xl bg-gray-200' />
        <div className='mx-auto h-4 w-1/2 animate-pulse rounded-3xl bg-gray-200' />
      </article>
    );

  const { id, name, image } = category;

  return (
    <article className='grid'>
      <Link className='clickable grid gap-2' href={`/category/${id}`}>
        <LazyImage
          className='h-24 w-full rounded-3xl'
          width={144}
          height={96}
          src={image}
          alt={name}
        />
        <h3 className='text-center'>{name}</h3>
      </Link>
    </article>
  );
}
