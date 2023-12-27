import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { UserNotification } from '../../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function useNotifications(): UseQueryResult<{
  data: UserNotification[];
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: UserNotification[];
  }>({
    queryKey: ['user-notifications', token],
    queryFn: () =>
      fetcher('/user-notifications', {
        headers: { Authorization: `Bearer ${token}` }
      })
  });

  return result;
}
