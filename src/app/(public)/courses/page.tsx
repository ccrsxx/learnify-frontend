'use client';

import { useSearchParams } from 'next/navigation';
import { useCourses } from '@/lib/hooks/use-courses';
import Courses from './courses';

export default function PublicCourses(): JSX.Element {
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();

  const { data, isLoading } = useCourses(searchParamsString);

  return <Courses coursesData={data} coursesLoading={isLoading} />;
}
