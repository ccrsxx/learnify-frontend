import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { UserNotification } from '../../types/schema';
import type {
  APIResponse,
  MutationResult,
  ExtractMutationVariables
} from '../../types/api';
import type { QueryClient } from '@tanstack/react-query';

type CrudNotificationResponse = APIResponse<UserNotification>;

export type CrudNotifications = {
  queryClient: QueryClient;
  updateNotificationMutation: MutationResult<string, CrudNotificationResponse>;
  deleteNotificationMutation: MutationResult<string, CrudNotificationResponse>;
  readAllNotificationsMutation: MutationResult<void, CrudNotificationResponse>;
};

export function useCrudNotifications(): CrudNotifications {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const updateNotificationMutation = useMutation<
    CrudNotificationResponse,
    Error,
    ExtractMutationVariables<CrudNotifications['updateNotificationMutation']>
  >({
    mutationFn: (id) =>
      fetcher(`/user-notifications/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['user-notifications']
      })
  });

  const deleteNotificationMutation = useMutation<
    CrudNotificationResponse,
    Error,
    ExtractMutationVariables<CrudNotifications['deleteNotificationMutation']>
  >({
    mutationFn: (id) =>
      fetcher(`/user-notifications/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['user-notifications']
      })
  });

  const readAllNotificationsMutation = useMutation<
    CrudNotificationResponse,
    Error,
    ExtractMutationVariables<CrudNotifications['readAllNotificationsMutation']>
  >({
    mutationFn: () =>
      fetcher('/user-notifications/read-all', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['user-notifications']
      })
  });

  return {
    queryClient,
    updateNotificationMutation,
    deleteNotificationMutation,
    readAllNotificationsMutation
  };
}
