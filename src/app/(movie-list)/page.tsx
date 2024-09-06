'use client';

import SearchMovie from '@/components/searchMovie';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Movie } from '@/models/movie';
import Image from 'next/image';
import { useState } from 'react';

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleOnWatched = (movie: Movie) => {
    movie.isWatched = true;
    setMovies([movie, ...movies]);
  };

  const handleOnUnwatched = (movie: Movie) => {
    movie.isWatched = false;
    setMovies([movie, ...movies]);
  };

  const MovieList = ({ movies }: { movies: Movie[] }) => {
    return (
      <>
        {movies.map((movie, idx) => (
          <>
            <div key={movie.imdbID} className="flex gap-2 p-2 font-geist-sans text-sm">
              {movie.Title}
            </div>
            {idx < movies.length - 1 && <Separator />}
          </>
        ))}
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

      <Card className="p-3">
        <SearchMovie onWatched={handleOnWatched} onUnwatched={handleOnUnwatched} />
        <Tabs defaultValue="watched" className="w-full">
          <TabsList className="w-full font-geist-mono">
            <TabsTrigger
              value="watched"
              className="w-1/2 text-black data-[state=active]:bg-watched data-[state=active]:text-white"
            >
              <Image
                className="mr-1"
                src="icons/eye-check.svg"
                width={14}
                height={14}
                alt="Eye check icon"
              />
              WATCHED
            </TabsTrigger>
            <TabsTrigger
              value="unwatched"
              className="w-1/2 text-black data-[state=active]:bg-unwatched data-[state=active]:text-white"
            >
              <Image
                className="mr-1"
                src="icons/eye-remove.svg"
                width={14}
                height={14}
                alt="Eye check icon"
              />
              UNWATCHED
            </TabsTrigger>
          </TabsList>
          <TabsContent value="watched">
            <MovieList movies={movies.filter((movie) => movie.isWatched)} />
          </TabsContent>
          <TabsContent value="unwatched">
            <MovieList movies={movies.filter((movie) => !movie.isWatched)} />
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
