import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import type { CourseCategory } from '../../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useCategories(): UseQueryResult<{
  data: CourseCategory[];
}> {
  const result = useQuery<{
    data: CourseCategory[];
  }>({
    queryKey: ['course-categories'],
    queryFn: () => fetcher('/course-categories')
  });

  return result;
}
