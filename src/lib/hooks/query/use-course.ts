import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { Course } from '../../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useCourse(courseId: string): UseQueryResult<{
  data: Course;
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: Course;
  }>({
    queryKey: ['courses', courseId, token],
    queryFn: () =>
      fetcher(
        `/courses/${courseId}`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      )
  });

  return result;
}
