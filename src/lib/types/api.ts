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
  | 'dashboard/statistics'
  | `${SlugEndPoints}/${string}`
  | `${SlugEndPointsWithParams}?${string}`;

export type ValidApiEndpoints = `/${ApiEndpoints}`;

export type APIResponse<T = void> = {
  message: string;
  data?: T;
};
