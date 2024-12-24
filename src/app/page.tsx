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
  // console.log(data.results[0]);
  const movieName: string = data.results[0].title;
  const movieRating: number = data.results[0].vote_average;
  const movieOverview: string = data.results[0].overview;
  const moviePoster = data.results[0].poster_path;
  console.log(moviePoster);
  return (
    <div>
      <div>
        <div className="h-[30%] w-[90%] mx-auto mt-4">
          <img
            src={`https://image.tmdb.org/t/p/w185/${moviePoster}`}
            alt="Movie Poster"
            className="bg-center rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          />
        </div>
        <div className="flex justify-between w-[90%] mx-auto mt-6">
          <div>
            <p className="text-[13px]">Now Playing:</p>
            <b>{movieName}</b>
          </div>
          <div>⭐️{movieRating}/10 </div>
        </div>
        <div className="text-[14px] w-[90%] mx-auto mt-6">
          <p>{movieOverview}</p>
        </div>
        <div className="bg-[#18181B] flex text-sm text-white rounded-md box-border p-2 w-[140px] m-4 ">
          <Play />
          <p>Watch Trailer</p>
        </div>
      </div>
      <div className="flex justify-between w-[90%] mx-auto">
        <b className="text-lg">Upcoming</b>
        <button className="flex">
          See more <ArrowRight />
        </button>
      </div>
      <div className="flex justify-between w-[90%] mx-auto">
        <Card />
        <Card />
      </div>
      <div className="flex justify-between w-[90%] mx-auto">
        <Card />
        <Card />
      </div>
      <div className="flex justify-between w-[90%] mx-auto">
        <Card />
        <Card />
      </div>
      <div className="flex justify-between w-[90%] mx-auto">
        <Card />
        <Card />
      </div>
      <div className="flex justify-between w-[90%] mx-auto">
        <Card />
        <Card />
      </div>
    </div>
  );
}
