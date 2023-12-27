import type { UseMutationResult } from '@tanstack/react-query';

type SlugEndPoints =
  | 'courses'
  | 'user-courses'
  | 'user-payments'
  | 'course-material-status';

type SlugEndPointsWithParams = 'courses' | 'courses/me';

type ApiEndpoints =
  | 'courses'
  | 'courses/me'
  | 'user-payments'
  | 'course-categories'
  | 'user-notifications'
  | 'dashboard/statistics'
  | `${SlugEndPoints}/${string}`
  | `${SlugEndPointsWithParams}?${string}`;

export type ValidApiEndpoints = `/${ApiEndpoints}`;

export type APIResponse<T = void> = {
  message: string;
  data?: T;
};

export type MutationResult<T = void, V = void> = UseMutationResult<
  V,
  Error,
  T,
  unknown
>;

export type ExtractMutationVariables<T> = T extends MutationResult<
  infer U,
  infer _
>
  ? U
  : never;
