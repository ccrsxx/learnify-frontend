import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import type { Course } from '../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useCourses(searchParams?: string): UseQueryResult<{
  data: Course[];
}> {
  const result = useQuery<{
    data: Course[];
  }>({
    queryKey: ['courses', searchParams],
    queryFn: () =>
      fetcher(searchParams ? `/courses?${searchParams}` : '/courses')
  });

  return result;
}
