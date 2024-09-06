import omdbApi from '@/apis/omdbApi';
import { Movie } from '@/models/movie';
import { PaginatedResult } from '@/models/paginatedResult';

export async function searchMovies(title: string): Promise<Movie[]> {
  try {
    const queryParams = {
      s: title,
    };
    const result: PaginatedResult<Movie> = await omdbApi('', queryParams);
    return result.Search;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}
