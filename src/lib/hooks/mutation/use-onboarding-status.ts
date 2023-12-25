import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { QueryClient } from '@tanstack/react-query';
import type {
  APIResponse,
  MutationResult,
  ExtractMutationVariables
} from '../../types/api';
import type { CourseMaterialStatus } from '../../types/schema';

type OnboardingStatusResponse = APIResponse<CourseMaterialStatus>;

type OnboardingStatus = {
  queryClient: QueryClient;
  updateOnboardingStatus: MutationResult<string, OnboardingStatusResponse>;
};

export function useOnboardingStatus(courseId: string): OnboardingStatus {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const updateOnboardingStatus = useMutation<
    OnboardingStatusResponse,
    Error,
    ExtractMutationVariables<OnboardingStatus['updateOnboardingStatus']>
  >({
    mutationFn: (id) =>
      fetcher(`/user-courses/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['courses', courseId, token]
      })
  });

  return {
    queryClient,
    updateOnboardingStatus
  };
}
