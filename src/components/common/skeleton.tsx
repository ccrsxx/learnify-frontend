import { clsx } from 'clsx';
import { MdPlayArrow } from 'react-icons/md';
import { BackButton } from '../ui/back-arrow';

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
      <div className='p-3'>
        <CourseStatsSkeleton />
      </div>
    </article>
  );
}

export function CourseStatsSkeleton({
  details
}: {
  details?: boolean;
}): JSX.Element {
  return (
    <div
      className={clsx(
        'grid justify-items-start gap-2',
        details ? 'max-w-xl [&>div]:h-6' : '[&>div]:h-4'
      )}
    >
      <div className='w-1/3 animate-pulse rounded-3xl bg-gray-200' />
      <div className='w-1/2 animate-pulse rounded-3xl bg-gray-200' />
      <div className='w-1/4 animate-pulse rounded-3xl bg-gray-200' />
    </div>
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

export function VideoPlayerSkeleton(): JSX.Element {
  return (
    <div className='grid h-80 w-full animate-pulse place-items-center rounded-xl bg-gray-200'>
      <div className='rounded-full text-5xl'>
        <MdPlayArrow className=' text-white' />
      </div>
    </div>
  );
}

export function CourseStudyCardSkeleton(): JSX.Element {
  return (
    <div className='grid w-full content-start gap-4 rounded-2xl bg-white p-6 shadow-high'>
      <div className='flex justify-between'>
        <div className='h-6 w-1/3 animate-pulse rounded-xl bg-gray-200' />
        <div className='h-6 w-1/4 animate-pulse rounded-xl bg-gray-200' />
      </div>
      <ol className='grid gap-6'>
        {Array.from({ length: 2 }).map((_, index) => (
          <li className='grid gap-3' key={index}>
            <div className='flex justify-between'>
              <div className='h-4 w-1/3 animate-pulse rounded-xl bg-gray-200' />
              <div className='h-4 w-16 animate-pulse rounded-xl bg-gray-200' />
            </div>
            <ol className='grid gap-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <li className='flex items-center gap-1' key={index}>
                  <div className='h-8 w-full animate-pulse rounded-xl bg-gray-200' />
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CourseDetailsSkeleton(): JSX.Element {
  return (
    <main className='grid gap-8 text-black'>
      <section className='bg-primary-blue-50'>
        <div className='layout grid gap-4 py-4'>
          <BackButton href='/courses' label='Kelas Lainnya' />
          <div className='grid max-w-xl gap-2'>
            <CourseStatsSkeleton details />
            <div className='h-6 w-32 rounded-lg bg-gray-200' />
          </div>
        </div>
      </section>
      <section className='layout flex w-full gap-8'>
        <section className='grid w-full max-w-xl shrink-0 gap-6'>
          <VideoPlayerSkeleton />
          <div className='grid gap-3'>
            <div className='h-6 w-1/3 animate-pulse rounded-xl bg-gray-200' />
            <div className='grid gap-3'>
              {Array.from({ length: 2 }).map((_, index) => (
                <div className='grid gap-2' key={index}>
                  <div className='h-4 w-1/2 animate-pulse rounded-xl bg-gray-200' />
                  <div className='h-4 w-3/4 animate-pulse rounded-xl bg-gray-200' />
                  <div className='h-4 w-1/3 animate-pulse rounded-xl bg-gray-200' />
                </div>
              ))}
            </div>
          </div>
          <div className='grid gap-3'>
            <div className='h-6 w-1/3 animate-pulse rounded-xl bg-gray-200' />
            <div className='grid gap-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className='flex items-center gap-1' key={index}>
                  <div className='h-4 w-4 animate-pulse rounded-full bg-gray-200' />
                  <div
                    className={clsx(
                      'h-4 animate-pulse rounded-xl bg-gray-200',
                      {
                        'w-2/4': index === 0,
                        'w-3/4': index === 1,
                        'w-1/3': index === 2
                      }
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='relative -top-44 w-full'>
          <CourseStudyCardSkeleton />
        </section>
      </section>
    </main>
  );
}
