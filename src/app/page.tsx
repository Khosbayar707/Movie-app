"use client";

import { Card } from "./_components/Card";
import { Trailer } from "./_components/Trailer";
import { Play } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Section } from "./_components/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { options } from "./api";
import { Suspense, useEffect, useState } from "react";
import { Movie } from "./types";

type movies = {
  results: Movie[];
};
export default function Home() {
  const [movies, setMovies] = useState<movies>();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);
  // console.log(movies?.results[0].title);

  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movies?.results[0].poster_path}`}
                alt="Movie Poster"
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between w-[90%] mx-auto mt-6">
              <div>
                <p className="text-[13px]">Now Playing:</p>
                <b>{movies?.results[0].title}</b>
              </div>
              <div>⭐️{movies?.results[0].vote_average.toFixed(1)}/10 </div>
            </div>
            <div className="text-[14px] w-[90%] mx-auto mt-6">
              <p>{movies?.results[0].overview}</p>
              <div className="bg-[#18181B] text-sm text-white rounded-md flex gap-1 box-border p-2 w-[140px] my-6">
                <Play />
                <p>Watch Trailer</p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movies?.results[1]?.poster_path}`}
                alt="Movie Poster"
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between w-[90%] mx-auto mt-6">
              <div>
                <p className="text-[13px]">Now Playing:</p>
                <b>{movies?.results[1].title}</b>
              </div>
              <div>⭐️{movies?.results[1].vote_average.toFixed(1)}/10 </div>
            </div>
            <div className="text-[14px] w-[90%] mx-auto mt-6">
              <p>{movies?.results[1].overview}</p>
              <div className="bg-[#18181B] text-sm text-white rounded-md flex gap-1 box-border p-2 w-[140px] my-6">
                <Play />
                <p>Watch Trailer</p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movies?.results[2].poster_path}`}
                alt="Movie Poster"
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between w-[90%] mx-auto mt-6">
              <div>
                <p className="text-[13px]">Now Playing:</p>
                <b>{movies?.results[2].title}</b>
              </div>
              <div>⭐️{movies?.results[2].vote_average.toFixed(1)}/10 </div>
            </div>
            <div className="text-[14px] w-[90%] mx-auto mt-6">
              <p>{movies?.results[2].overview}</p>
              <div className="bg-[#18181B] text-sm text-white rounded-md flex gap-1 box-border p-2 w-[140px] my-6">
                <Play />
                <p>Watch Trailer</p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <Section title="Upcoming" endpoint="upcoming" />
      <Section title="Top Rated" endpoint="top_rated" />
      <Section title="Popular" endpoint="popular" />
    </div>
  );
}
