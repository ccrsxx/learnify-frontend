import Link from 'next/link';
import { LazyImage } from '../ui/lazy-image';
import type { Category } from '@/lib/types/schema';

export function CategoryCard({ id, name, image }: Category): JSX.Element {
  return (
    <article className='grid'>
      <Link className='clickable grid gap-2' href={`/categories/${id}`}>
        <LazyImage
          className='h-24 w-full rounded-3xl'
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
