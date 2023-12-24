import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { Course } from '../../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useAdminCourses(): UseQueryResult<{
  data: Course[];
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: Course[];
  }>({
    queryKey: ['courses', 'admin', token],
    queryFn: () =>
      fetcher('/courses?admin=true', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  });

  return result;
}
