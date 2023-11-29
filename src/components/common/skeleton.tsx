import { clsx } from 'clsx';

export function CourseFilterSkeleton(): JSX.Element {
  return (
    <div className='grid animate-pulse gap-4'>
      <div className='h-5 w-1/3 rounded-3xl bg-gray-200' />
      {Array.from({ length: 3 }).map((_, i) => (
        <div className='flex gap-2' key={i}>
          <div className='h-5 w-5 rounded bg-gray-200' />
          <div
            className={clsx('h-5 rounded-3xl bg-gray-200', {
              'w-2/4': i === 0,
              'w-3/4': i === 1,
              'w-1/3': i === 2
            })}
          />
        </div>
      ))}
    </div>
  );
}

export function CourseCardSkeleton(): JSX.Element {
  return (
    <article className='rounded-xl bg-white shadow-low'>
      <div className='h-24 w-full animate-pulse rounded-t-md bg-gray-200' />
      <section className='grid justify-items-start gap-2 p-3'>
        <div className='h-4 w-1/3 animate-pulse rounded-3xl bg-gray-200' />
        <div className='h-4 w-1/2 animate-pulse rounded-3xl bg-gray-200' />
        <div className='h-4 w-1/4 animate-pulse rounded-3xl bg-gray-200' />
      </section>
    </article>
  );
}

export function CategoryCardSkeleton(): JSX.Element {
  return (
    <article className='grid gap-2'>
      <div className='h-24 w-full animate-pulse rounded-3xl bg-gray-200' />
      <div className='mx-auto h-4 w-1/2 animate-pulse rounded-3xl bg-gray-200' />
    </article>
  );
}

export function CategoryTagSkeleton(): JSX.Element {
  return <div className='h-8 w-24 animate-pulse rounded-xl bg-gray-200' />;
}
