import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import type { User } from '@/lib/types/schema';

export function useRequireAuth(
  { redirect, admin } = { redirect: '/login', admin: false }
): User | null {
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading } = useAuth();

  const needsToBeAdmin = admin ? user?.admin : user;

  useEffect(() => {
    if (loading || needsToBeAdmin) return;

    router.replace(`${redirect}?redirect=${pathname}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, needsToBeAdmin, loading]);

  return needsToBeAdmin ? user : null;
}
