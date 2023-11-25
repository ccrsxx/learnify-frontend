import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import type { User } from '@/lib/types/schema';

export function useRequireAuth(
  { redirect } = { redirect: '/login' }
): User | null {
  const { user, loading } = useAuth();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  useEffect(() => {
    if (!loading && !user) void replace(redirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return user;
}
