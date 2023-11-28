import { NEXT_PUBLIC_BACKEND_URL } from './env';
import type { ValidApiEndpoints } from './types/api';

/**
 * A fetcher function that adds the owner bearer token to the request.
 */
export async function fetcher<T>(
  input: ValidApiEndpoints,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${input}`, init);

  const data = (await res.json()) as T;

  return data;
}
