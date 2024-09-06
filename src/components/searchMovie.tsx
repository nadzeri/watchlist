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
import isUnwatchedSelected from '@/utils/isUnwatchedSelected';
import isWatchedSelected from '@/utils/isWatchedSelected';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';

export default function SearchMovie({
  selectedMovies,
  onAddMovie,
  onToggleWatch,
  onDeleteMovie,
}: {
  selectedMovies: Movie[];
  onAddMovie: Function;
  onToggleWatch: Function;
  onDeleteMovie: Function;
}) {
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

  const handleOnWatched = (movie: Movie) => {
    if (isWatchedSelected(selectedMovies, movie)) {
      onDeleteMovie(movie);
    } else if (isUnwatchedSelected(selectedMovies, movie)) {
      onToggleWatch(movie);
    } else {
      movie.isWatched = true;
      onAddMovie(movie);
    }
  };

  const handleOnUnwatched = (movie: Movie) => {
    if (isUnwatchedSelected(selectedMovies, movie)) {
      onDeleteMovie(movie);
    } else if (isWatchedSelected(selectedMovies, movie)) {
      onToggleWatch(movie);
    } else {
      movie.isWatched = false;
      onAddMovie(movie);
    }
  };

  return (
    <>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]" shouldFilter={false}>
        <CommandInput placeholder="Type a command or search..." onValueChange={handleSearchMovie} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {movies?.map((movie: Movie) => (
              <CommandItem className="flex justify-between" key={movie.imdbID}>
                <span className="font-geist-sans text-sm">{movie.Title}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={
                      'hover:bg-watched-10 h-6 w-6 ' +
                      (isWatchedSelected(selectedMovies, movie) ? 'bg-watched-10' : '')
                    }
                    onClick={() => handleOnWatched(movie)}
                  >
                    <Image src="icons/eye-check.svg" width={14} height={14} alt="Eye check icon" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={
                      'hover:bg-unwatched-10 h-6 w-6 ' +
                      (isUnwatchedSelected(selectedMovies, movie) ? 'bg-unwatched-10' : '')
                    }
                    onClick={() => handleOnUnwatched(movie)}
                  >
                    <Image
                      src="icons/eye-remove.svg"
                      width={14}
                      height={14}
                      alt="Eye remove icon"
                    />
                  </Button>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
