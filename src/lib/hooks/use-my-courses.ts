import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import { useAuth } from '../context/auth-context';
import type { Course } from '../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useMyCourses(searchParams?: string): UseQueryResult<{
  data: Course[];
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: Course[];
  }>({
    queryKey: ['courses', 'me', token, searchParams],
    queryFn: () =>
      fetcher(searchParams ? `/courses/me?${searchParams}` : '/courses/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  });

  return result;
}
