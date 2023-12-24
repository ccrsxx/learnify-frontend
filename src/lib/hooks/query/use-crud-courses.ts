import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { Course } from '../../types/schema';
import type { APIResponse } from '../../types/api';
import type { QueryClient, UseMutationResult } from '@tanstack/react-query';

type MutationResult<T = void> = UseMutationResult<
  APIResponse<Course>,
  Error,
  T,
  unknown
>;

type ExtractMutationVariables<T> = T extends MutationResult<infer U>
  ? U
  : never;

type CrudCourses = {
  queryClient: QueryClient;
  createCourseMutation: MutationResult<FormData>;
  updateCourseMutation: MutationResult<{ id: string; data: FormData }>;
  deleteCourseMutation: MutationResult<string>;
};

export function useCrudCourses(): CrudCourses {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const createCourseMutation = useMutation<
    APIResponse<Course>,
    Error,
    ExtractMutationVariables<CrudCourses['createCourseMutation']>
  >({
    mutationFn: (data) =>
      fetcher('/courses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['courses']
      })
  });

  const updateCourseMutation = useMutation<
    APIResponse<Course>,
    Error,
    ExtractMutationVariables<CrudCourses['updateCourseMutation']>
  >({
    mutationFn: ({ id, data }) =>
      fetcher(`/courses/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['courses']
      })
  });

  const deleteCourseMutation = useMutation<
    APIResponse<Course>,
    Error,
    ExtractMutationVariables<CrudCourses['deleteCourseMutation']>
  >({
    mutationFn: (id) =>
      fetcher(`/courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  });

  return {
    queryClient,
    createCourseMutation,
    updateCourseMutation,
    deleteCourseMutation
  };
}
