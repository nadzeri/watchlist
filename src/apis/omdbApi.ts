import combinePath from '@/utils/combinePath';

export default async function omdbApi(
  endpoint: string,
  queryParams: { [key: string]: string } = {},
) {
  const baseUrl: string = process.env.NEXT_PUBLIC_OMDB_API_URL || '';
  const url: string = combinePath(baseUrl, endpoint);

  queryParams.apikey = process.env.NEXT_PUBLIC_OMDB_API_KEY || '';

  const searchParams = new URLSearchParams(queryParams);
  const searchParamsString = searchParams.toString();

  // Perform the request
  const response = await fetch(`${url}?${searchParamsString}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
}
