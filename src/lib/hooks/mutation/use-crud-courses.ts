import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../fetcher';
import { useAuth } from '../../context/auth-context';
import type { Course } from '../../types/schema';
import type {
  APIResponse,
  MutationResult,
  ExtractMutationVariables
} from '../../types/api';
import type { QueryClient } from '@tanstack/react-query';

type CrudCourseResponse = APIResponse<Course>;

type CrudCourses = {
  queryClient: QueryClient;
  createCourseMutation: MutationResult<FormData, CrudCourseResponse>;
  updateCourseMutation: MutationResult<
    { id: string; data: FormData },
    CrudCourseResponse
  >;
  deleteCourseMutation: MutationResult<string, CrudCourseResponse>;
};

export function useCrudCourses(): CrudCourses {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const createCourseMutation = useMutation<
    CrudCourseResponse,
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
    CrudCourseResponse,
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
    CrudCourseResponse,
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
