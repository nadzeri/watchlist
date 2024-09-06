import { Movie } from '@/models/movie';

export default function isWatchedSelected(selectedMovies: Movie[], movie: Movie): boolean {
  const existingMovie = selectedMovies.find((m) => m.imdbID === movie.imdbID);
  if (!existingMovie) {
    return false;
  }

  return existingMovie.isWatched;
}
