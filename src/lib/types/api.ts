type SlugEndPoints = 'courses';
type SlugEndPointsWithParams = 'courses';

type ApiEndpoints =
  | 'courses'
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
