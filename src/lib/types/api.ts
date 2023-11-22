export type APIResponse<T = void> = {
  message: string;
  data?: T;
};
