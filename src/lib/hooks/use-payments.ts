import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import { useAuth } from '../context/auth-context';
import type { UserPayment } from '../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function usePayments(): UseQueryResult<{
  data: UserPayment[];
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: UserPayment[];
  }>({
    queryKey: ['dashboard', 'payments', token],
    queryFn: () =>
      fetcher('/user-payments', {
        headers: { Authorization: `Bearer ${token}` }
      })
  });

  return result;
}
