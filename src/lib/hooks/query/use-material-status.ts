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

type MaterialStatus = {
  queryClient: QueryClient;
  updateMaterialStatusMutation: MutationResult<string>;
};

export function useMaterialStatus(): MaterialStatus {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const updateMaterialStatusMutation = useMutation<
    APIResponse<CourseMaterialStatus>,
    Error,
    ExtractMutationVariables<MaterialStatus['updateMaterialStatusMutation']>
  >({
    mutationFn: (id) =>
      fetcher(`/course-material-status/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['courses']
      })
  });

  return {
    queryClient,
    updateMaterialStatusMutation
  };
}
