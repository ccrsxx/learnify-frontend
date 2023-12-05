import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import type { Course } from '../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useCourse(courseId: string): UseQueryResult<{
  data: Course;
}> {
  const result = useQuery<{
    data: Course;
  }>({
    queryKey: ['courses', courseId],
    queryFn: () => fetcher(`/courses/${courseId}`)
  });

  return result;
}
