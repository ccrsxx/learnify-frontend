type SlugEndPoints = 'courses' | 'course-material-status' | 'user-payments';
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
