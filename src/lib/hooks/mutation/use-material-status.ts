import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type {
  APIResponse,
  MutationResult,
  ExtractMutationVariables
} from '../../types/api';
import type { CourseMaterialStatus } from '../../types/schema';
import type { QueryClient } from '@tanstack/react-query';

type MaterialStatusResponse = APIResponse<CourseMaterialStatus>;

type MaterialStatus = {
  queryClient: QueryClient;
  updateMaterialStatusMutation: MutationResult<string, MaterialStatusResponse>;
};

export function useMaterialStatus(): MaterialStatus {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const updateMaterialStatusMutation = useMutation<
    MaterialStatusResponse,
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
