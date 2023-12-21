'use client';

import { useSearchParams } from 'next/navigation';
import { useMyCourses } from '@/lib/hooks/use-my-courses';
import Courses from '@/app/(public)/courses/courses';

export default function MyCourses(): JSX.Element {
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();

  const { data, isLoading } = useMyCourses(searchParamsString);

  return <Courses userCourses coursesData={data} coursesLoading={isLoading} />;
}
