"use client";
import { ArrowRight } from "lucide-react";
import { Movie } from "@/app/[category]/page";
import { Card } from "@/app/_components/Card";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};

export default function Recommend() {
  const pathname = usePathname();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        ` https://api.themoviedb.org/3/${pathname}`,
        options
      );
      const resJson = await res.json();
      setMovies(resJson.results);
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="flex justify-between w-[90%] mx-auto mt-12">
        <b className="text-lg">Recommendations</b>
        <button className="flex">
          See more <ArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
        {movies?.map((movie: Movie) => (
          <Card prop={movie} key={`movie-${movie.id}`} />
        ))}
      </div>
    </div>
  );
}
