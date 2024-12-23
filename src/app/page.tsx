import Image from "next/image";
import { Card } from "./_components/Card";
import { Trailer } from "./_components/Trailer";
import { Play } from "lucide-react";
import { ArrowRight } from "lucide-react";

export const API_KEY = "f39690f9830ce804b7894ac1def4f7e9";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};

export default async function Home() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await res.json();
  const movies = data.results?.slice(1, 13);

  return (
    <div>
      <div className="relative w-[90%] h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w185/${data.results[0].poster_path}`}
          alt="Movie Poster"
          className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between w-[90%] mx-auto mt-6">
        <div>
          <p className="text-[13px]">Now Playing:</p>
          <b>{data.results[0].title}</b>
        </div>
        <div>⭐️{data.results[0].vote_average}/10 </div>
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

      <div className="flex justify-between w-[90%] mx-auto mt-12">
        <b className="text-lg">Upcoming</b>
        <button className="flex">
          See more <ArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            vote={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
}
