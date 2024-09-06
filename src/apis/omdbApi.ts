import combinePath from '@/utils/combinePath';

export default async function omdbApi(
  endpoint: string,
  queryParams: { [key: string]: string } = {},
  options: RequestInit = {},
) {
  const baseUrl: string = process.env.NEXT_PUBLIC_OMDB_API_URL || '';
  const url: string = combinePath(baseUrl, endpoint);

  queryParams.apikey = process.env.NEXT_PUBLIC_OMDB_API_KEY || '';

  const searchParams = new URLSearchParams(queryParams);
  const searchParamsString = searchParams.toString();

  // Set default headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Perform the request
  const response = await fetch(`${url}?${searchParamsString}`, config);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
}
