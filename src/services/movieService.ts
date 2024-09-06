import omdbApi from '@/apis/omdbApi';

export async function searchMovies(title: string) {
  try {
    const queryParams = {
      s: title,
    };
    const data = await omdbApi('', queryParams);
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}
