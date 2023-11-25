type SlugEndPoints = 'courses';

type ApiEndpoints =
  | 'courses'
  | 'course-categories'
  | `${SlugEndPoints}/${string}`;

export type ValidApiEndpoints = `/${ApiEndpoints}`;

export type APIResponse<T = void> = {
  message: string;
  data?: T;
};
