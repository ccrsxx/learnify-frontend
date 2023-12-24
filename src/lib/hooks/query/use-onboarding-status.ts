import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { APIResponse } from '../../types/api';
import type { CourseMaterialStatus } from '../../types/schema';
import type { QueryClient, UseMutationResult } from '@tanstack/react-query';

type MutationResult<T = void> = UseMutationResult<
  APIResponse<CourseMaterialStatus>,
  Error,
  T,
  unknown
>;

type ExtractMutationVariables<T> = T extends MutationResult<infer U>
  ? U
  : never;

type OnboardingStatus = {
  queryClient: QueryClient;
  updateOnboardingStatus: MutationResult<string>;
};

export function useOnboardingStatus(courseId: string): OnboardingStatus {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const updateOnboardingStatus = useMutation<
    APIResponse<CourseMaterialStatus>,
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
