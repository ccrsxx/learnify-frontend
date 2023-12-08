import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import type { User } from '@/lib/types/schema';

export function useRequireAuth(
  { redirect } = { redirect: '/login' }
): User | null {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || user) return;

    router.replace(redirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return user;
}
