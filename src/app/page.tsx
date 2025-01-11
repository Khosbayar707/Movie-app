"use client";

import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Section } from "./_components/Section";
import { options } from "./api";
import { Suspense, useEffect, useState } from "react";
import { Movie } from "./types";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

type MoviesData = {
  results: Movie[];
};

function CarouselMovieItem({ movie }: { movie: Movie }) {
  return (
    <CarouselItem>
      <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between w-[90%] mx-auto mt-6">
        <div>
          <p className="text-[13px]">Now Playing:</p>
          <b>{movie.title}</b>
        </div>
        <div>⭐️{movie.vote_average.toFixed(1)}/10</div>
      </div>
      <div className="text-[14px] w-[90%] mx-auto mt-6">
        <p>{movie.overview}</p>
        <div className="bg-[#18181B] text-sm text-white rounded-md flex gap-1 box-border p-2 w-[140px] my-6">
          <Play />
          <p>Watch Trailer</p>
        </div>
      </div>
    </CarouselItem>
  );
}

export default function Home() {
  const [movies, setMovies] = useState<MoviesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movies?.results || movies.results.length === 0) {
    return <div>No movies available at the moment.</div>;
  }

  return (
    <div>
      <Carousel>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 cursor-pointer">
          <ChevronLeft />
        </CarouselPrevious>
        <CarouselContent>
          {movies.results.slice(0, 3).map((movie) => (
            <CarouselMovieItem key={movie.id} movie={movie} />
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 cursor-pointer">
          <ChevronRight />
        </CarouselNext>
      </Carousel>
      <Section title="Upcoming" endpoint="upcoming" />
      <Section title="Top Rated" endpoint="top_rated" />
      <Section title="Popular" endpoint="popular" />
    </div>
  );
}
