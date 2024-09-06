'use client';

import {
  Command,
  CommandDialog,
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
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function SearchMovie({
  selectedMovies,
  onAddMovie,
  onToggleWatch,
  onDeleteMovie,
}: {
  selectedMovies: Movie[];
  onAddMovie: (movie: Movie) => void;
  onToggleWatch: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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
      <Command className="rounded-lg border md:min-w-[450px]" shouldFilter={false}>
        <CommandInput placeholder="Search for a movie..." onClick={() => setOpen(true)} />
      </Command>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search for a movie..." onValueChange={handleSearchMovie} />
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
                      // eslint-disable-next-line
                      className={
                        'hover:bg-watched-10 h-6 w-6 ' +
                        (isWatchedSelected(selectedMovies, movie) ? 'bg-watched-10' : '')
                      }
                      onClick={() => handleOnWatched(movie)}
                    >
                      <Eye
                        size={14}
                        className={
                          'hover:text-watched ' +
                          (isWatchedSelected(selectedMovies, movie) ? 'text-watched' : '')
                        }
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      // eslint-disable-next-line
                      className={
                        'hover:bg-unwatched-10 h-6 w-6 ' +
                        (isUnwatchedSelected(selectedMovies, movie) ? 'bg-unwatched-10' : '')
                      }
                      onClick={() => handleOnUnwatched(movie)}
                    >
                      <EyeOff
                        size={14}
                        className={
                          'hover:text-unwatched ' +
                          (isUnwatchedSelected(selectedMovies, movie) ? 'text-unwatched' : '')
                        }
                      />
                    </Button>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
