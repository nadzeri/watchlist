'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Movie } from '@/models/movie';
import { searchMovies } from '@/services/movieService';
import debounce from '@/utils/debounce';
import { useState } from 'react';

export default function SearchMovie() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const debouncedSearchMovie = debounce(async (searchText: string) => {
    const movies: Movie[] = await searchMovies(searchText);
    setMovies(movies);
  }, 500);

  const handleSearchMovie = (searchText: string) => {
    if (searchText?.length < 3) {
      setMovies([]);
      return;
    }

    debouncedSearchMovie(searchText);
  };
  return (
    <>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]" shouldFilter={false}>
        <CommandInput placeholder="Type a command or search..." onValueChange={handleSearchMovie} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {movies?.map((movie: Movie) => (
              <CommandItem key={movie.imdbID}>
                <span>{movie.Title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
