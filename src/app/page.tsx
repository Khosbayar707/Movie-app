import Image from "next/image";
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

export default async function Home() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );
  const data = await res.json();
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}`}
                alt="Movie Poster"
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between w-[90%] mx-auto mt-6">
              <div>
                <p className="text-[13px]">Now Playing:</p>
                <b>{data.results[0].title}</b>
              </div>
              <div>⭐️{data.results[0].vote_average.toFixed(1)}/10 </div>
            </div>
            <div className="text-[14px] w-[90%] mx-auto mt-6">
              <p>{data.results[0].overview}</p>
            </div>
            <div className="flex justify-start max-w-[70%]">
              <div className="bg-[#18181B] text-sm text-white rounded-md flex gap-1 box-border p-2 w-[140px] m-6">
                <Play />
                <p>Watch Trailer</p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.results[1].poster_path}`}
                alt="Movie Poster"
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between w-[90%] mx-auto mt-6">
              <div>
                <p className="text-[13px]">Now Playing:</p>
                <b>{data.results[1].title}</b>
              </div>
              <div>⭐️{data.results[1].vote_average.toFixed(1)}/10 </div>
            </div>
            <div className="text-[14px] w-[90%] mx-auto mt-6">
              <p>{data.results[1].overview}</p>
            </div>
            <div className="flex justify-start max-w-[70%]">
              <div className="bg-[#18181B] text-sm text-white rounded-md flex gap-1 box-border p-2 w-[140px] m-6">
                <Play />
                <p>Watch Trailer</p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.results[2].poster_path}`}
                alt="Movie Poster"
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between w-[90%] mx-auto mt-6">
              <div>
                <p className="text-[13px]">Now Playing:</p>
                <b>{data.results[2].title}</b>
              </div>
              <div>⭐️{data.results[2].vote_average.toFixed(1)}/10 </div>
            </div>
            <div className="text-[14px] w-[90%] mx-auto mt-6">
              <p>{data.results[2].overview}</p>
            </div>
            <div className="flex justify-start max-w-[70%]">
              <div className="bg-[#18181B] text-sm text-white rounded-md flex gap-1 box-border p-2 w-[140px] m-6">
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
