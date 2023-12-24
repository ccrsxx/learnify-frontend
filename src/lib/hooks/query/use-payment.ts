import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { UserPayment } from '../../types/schema';
import type { UseQueryResult } from '@tanstack/react-query';

export function usePayment(paymentId: string): UseQueryResult<{
  data: UserPayment;
}> {
  const { token } = useAuth();

  const result = useQuery<{
    data: UserPayment;
  }>({
    queryKey: ['user-payments', paymentId, token],
    queryFn: () =>
      fetcher(`/user-payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
  });

  return result;
}
