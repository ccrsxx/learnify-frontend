import { clsx } from 'clsx';
import { MdPlayArrow } from 'react-icons/md';
import { BackButton } from '../ui/back-arrow';

export function CourseFilterSkeleton(): JSX.Element {
  return (
    <div className='grid animate-pulse gap-4'>
      <div className='h-5 w-1/3 rounded-medium bg-gray-200' />
      {Array.from({ length: 3 }).map((_, i) => (
        <div className='flex gap-2' key={i}>
          <div className='h-5 w-5 rounded-low bg-gray-200' />
          <div
            className={clsx('h-5 rounded-medium bg-gray-200', {
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
    <article className='rounded-medium bg-white shadow-low'>
      <div className='h-24 w-full animate-pulse rounded-t-medium bg-gray-200' />
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
      <div className='w-1/3 animate-pulse rounded-medium bg-gray-200' />
      <div className='w-1/2 animate-pulse rounded-medium bg-gray-200' />
      <div className='w-1/4 animate-pulse rounded-medium bg-gray-200' />
    </div>
  );
}

export function CategoryCardSkeleton(): JSX.Element {
  return (
    <article className='grid gap-2'>
      <div className='h-24 w-full animate-pulse rounded-high bg-gray-200' />
      <div className='mx-auto h-4 w-1/2 animate-pulse rounded-medium bg-gray-200' />
    </article>
  );
}

export function CategoryTagSkeleton(): JSX.Element {
  return <div className='h-8 w-24 animate-pulse rounded-medium bg-gray-200' />;
}

export function VideoPlayerSkeleton(): JSX.Element {
  return (
    <div className='grid h-64 w-full animate-pulse place-items-center rounded-medium bg-gray-200 md:h-80'>
      <MdPlayArrow className='text-5xl text-white' />
    </div>
  );
}

export function CourseStudyCardSkeleton(): JSX.Element {
  return (
    <div className='grid w-full content-start gap-4 rounded-medium bg-white p-6 shadow-high'>
      <div className='flex flex-col justify-between gap-2 md:flex-row'>
        <div className='h-6 w-1/3 animate-pulse rounded-medium bg-gray-200' />
        <div className='h-6 w-1/4 animate-pulse rounded-medium bg-gray-200' />
      </div>
      <ol className='grid gap-6'>
        {Array.from({ length: 2 }).map((_, index) => (
          <li className='grid gap-3' key={index}>
            <div className='flex flex-col justify-between gap-2 md:flex-row'>
              <div className='h-4 w-1/3 animate-pulse rounded-medium bg-gray-200' />
              <div className='h-4 w-16 animate-pulse rounded-medium bg-gray-200' />
            </div>
            <ol className='grid gap-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <li className='flex items-center gap-1' key={index}>
                  <div className='h-8 w-full animate-pulse rounded-medium bg-gray-200' />
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
    <main className='text-black'>
      <section className='bg-primary-blue-50'>
        <div className='layout grid gap-4 py-4'>
          <BackButton href='/courses' label='Kelas Lainnya' />
          <div className='flex items-center gap-8'>
            <div className='grid w-full shrink-0 gap-2 lg:max-w-xl'>
              <CourseStatsSkeleton details />
              <div className='h-6 w-32 rounded-high bg-gray-200' />
            </div>
            <div className='hidden h-52 w-full animate-pulse rounded-medium bg-gray-200 lg:block' />
          </div>
        </div>
      </section>
      <section className='layout grid w-full gap-x-8 gap-y-6 py-8 lg:grid-cols-[576px,1fr]'>
        <section className='order-1 grid w-full gap-6 lg:max-w-xl'>
          <VideoPlayerSkeleton />
        </section>
        <section className='order-2 grid gap-4 lg:-mt-24 lg:max-w-lg'>
          <div className='grid gap-3'>
            <div className='h-6 w-1/3 animate-pulse rounded-medium bg-gray-200' />
            <div className='grid gap-3'>
              {Array.from({ length: 2 }).map((_, index) => (
                <div className='grid gap-2' key={index}>
                  <div className='h-4 w-1/2 animate-pulse rounded-medium bg-gray-200' />
                  <div className='h-4 w-3/4 animate-pulse rounded-medium bg-gray-200' />
                  <div className='h-4 w-1/3 animate-pulse rounded-medium bg-gray-200' />
                </div>
              ))}
            </div>
          </div>
          <div className='grid gap-3'>
            <div className='h-6 w-1/3 animate-pulse rounded-medium bg-gray-200' />
            <div className='grid gap-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className='flex items-center gap-1' key={index}>
                  <div className='h-4 w-4 animate-pulse rounded-medium bg-gray-200' />
                  <div
                    className={clsx(
                      'h-4 animate-pulse rounded-medium bg-gray-200',
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
        <section className='order-1'>
          <CourseStudyCardSkeleton />
        </section>
      </section>
    </main>
  );
}

export function NotificationItemSkeleton(): JSX.Element {
  return (
    <li className='grid gap-1 p-4'>
      <div className='h-5 w-1/2 animate-pulse rounded-medium bg-gray-300' />
      <div className='h-4 w-3/4 animate-pulse rounded-medium bg-gray-200' />
      <div className='h-4 w-1/4 animate-pulse rounded-medium bg-gray-200' />
    </li>
  );
}

export function WidgetSkeleton(): JSX.Element {
  return (
    <article className='flex items-center gap-4 rounded-medium bg-gray-100 p-6'>
      <div className='h-14 w-14 animate-pulse rounded-full bg-gray-200' />
      <div className='grid gap-2'>
        <div className='h-6 w-12 animate-pulse rounded-medium bg-gray-200' />
        <div className='h-4 w-24 animate-pulse rounded-medium bg-gray-200' />
      </div>
    </article>
  );
}

export function CheckoutSkeleton(): JSX.Element {
  return (
    <main className='layout grid gap-8 py-8'>
      <section className='grid gap-2'>
        <BackButton label='Kembali' />
        <div className='mx-auto h-6 w-1/3 animate-pulse rounded-medium bg-gray-200' />
      </section>
      <section className='flex flex-col items-start gap-8 md:flex-row'>
        <section className='grid w-full gap-4 rounded-medium p-6 text-black shadow-low'>
          <div className='h-6 w-full animate-pulse rounded-medium bg-gray-200' />
          <div className='h-6 w-full animate-pulse rounded-medium bg-gray-200' />
        </section>
        <section className='grid w-full gap-4 rounded-medium p-6 text-black shadow-low md:max-w-md'>
          <div className='h-6 w-1/3 animate-pulse rounded-medium bg-gray-200' />
          <CourseCardSkeleton />
          <div className='flex justify-between gap-2'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className='h-6 w-1/3 animate-pulse rounded-medium bg-gray-200'
                key={index}
              />
            ))}
          </div>
          <div className='mt-8 h-10 w-full animate-pulse rounded-medium bg-gray-200' />
        </section>
      </section>
    </main>
  );
}
