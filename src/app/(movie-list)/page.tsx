'use client';

import SearchMovie from '@/components/searchMovie';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Movie } from '@/models/movie';
import { Ellipsis, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAddMovie = (movie: Movie) => {
    setMovies([movie, ...movies]);
  };

  const handleDeleteMovie = (movie: Movie) => {
    setMovies(movies.filter((m) => m.imdbID !== movie.imdbID));
  };

  const handleToggleWatch = (movie: Movie) => {
    const existingMovie = movies.find((m) => m.imdbID === movie.imdbID);
    if (!existingMovie) {
      return;
    }

    existingMovie.isWatched = !existingMovie.isWatched;
    setMovies([...movies]);
  };

  const MovieList = ({ movies, isWatched }: { movies: Movie[]; isWatched: boolean }) => {
    return (
      <>
        {movies
          .filter((movie) => movie.isWatched === isWatched)
          .map((movie, idx, filterredMovies) => (
            <>
              <div
                key={movie.imdbID}
                className="flex items-center justify-between gap-2 px-2 font-geist-sans text-sm"
              >
                <div>{movie.Title}</div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => ''}>
                      <Ellipsis size={22} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleToggleWatch(movie)}
                    >
                      Move to unwatched
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleDeleteMovie(movie)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {idx < filterredMovies.length - 1 && <Separator />}
            </>
          ))}

        {movies.filter((movie) => movie.isWatched === isWatched).length === 0 && (
          <div className="flex justify-center p-2 font-geist-sans text-sm text-gray-500">
            No movies found.
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <section className="flex flex-col gap-1">
        <h5 className="font-geist-mono text-sm text-black">MY MOVIE LIST</h5>
        <h1 className="font-geist-sans text-2xl font-extrabold text-black sm:text-4xl">
          Organize your movie watching journey
        </h1>
        <p className="font-geist-sans text-sm text-black">
          Keep track of films you&apos;ve seen and ones you want to watch.
        </p>
      </section>

      <Card className="flex flex-col gap-3 p-3">
        <SearchMovie
          selectedMovies={movies}
          onAddMovie={handleAddMovie}
          onToggleWatch={handleToggleWatch}
          onDeleteMovie={handleDeleteMovie}
        />
        <Tabs defaultValue="watched" className="w-full">
          <TabsList className="w-full font-geist-mono">
            <TabsTrigger
              value="watched"
              className="w-1/2 text-black data-[state=active]:bg-watched data-[state=active]:text-white"
            >
              <Eye size={14} className="mr-1" />
              WATCHED
            </TabsTrigger>
            <TabsTrigger
              value="unwatched"
              className="w-1/2 text-black data-[state=active]:bg-unwatched data-[state=active]:text-white"
            >
              <EyeOff size={14} className="mr-1" />
              UNWATCHED
            </TabsTrigger>
          </TabsList>
          <TabsContent value="watched">
            <MovieList movies={movies} isWatched={true} />
          </TabsContent>
          <TabsContent value="unwatched">
            <MovieList movies={movies} isWatched={false} />
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
