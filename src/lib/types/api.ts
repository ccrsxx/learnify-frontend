type SlugEndPoints = 'courses';
type SlugEndPointsWithParams = 'courses';

type ApiEndpoints =
  | 'courses'
  | 'course-categories'
  | `${SlugEndPoints}/${string}`
  | `${SlugEndPointsWithParams}?${string}`;

export type ValidApiEndpoints = `/${ApiEndpoints}`;

export type APIResponse<T = void> = {
  message: string;
  data?: T;
};
