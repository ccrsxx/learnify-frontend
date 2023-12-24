import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { Statistic } from '../../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useStatistics(): UseQueryResult<{
  data: Statistic;
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: Statistic;
  }>({
    queryKey: ['courses', 'statistics', token],
    queryFn: () =>
      fetcher('/dashboard/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      })
  });

  return result;
}
