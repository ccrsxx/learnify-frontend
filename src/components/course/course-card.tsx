import Link from 'next/link';
import { clsx } from 'clsx';
import { LazyImage } from '../ui/lazy-image';
import { CourseStats } from './course-stats';
import { CourseCardButton } from './course-card-button';
import type { CourseCardButtonProps } from './course-card-button';

type CourseCardProps = CourseCardButtonProps & {
  details?: boolean;
  showButton?: boolean;
};

export function CourseCard({
  modal,
  course,
  payment,
  details,
  homepage,
  progress,
  showButton = true
}: CourseCardProps): JSX.Element {
  const {
    id,
    name,
    image,
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
          <CourseStats
            course={course}
            details={details}
            showDetails={showButton}
          />
          {showButton && (
            <CourseCardButton
              modal={modal}
              course={course}
              payment={payment}
              homepage={homepage}
              progress={progress}
            />
          )}
        </section>
      </Link>
    </article>
  );
}
