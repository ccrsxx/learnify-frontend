import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { UserPayment } from '../../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function usePaymentsHistory(): UseQueryResult<{
  data: UserPayment[];
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: UserPayment[];
  }>({
    queryKey: ['user-payments', 'me', token],
    queryFn: () =>
      fetcher('/user-payments/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
  });

  return result;
}
