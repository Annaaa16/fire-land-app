import { API_URLS } from '@/constants';

export async function fetcher<T>(url: string, cookie?: string): Promise<T> {
  return await fetch(API_URLS.BASE + url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: cookie || '',
    },
  }).then((res) => res.json());
}
