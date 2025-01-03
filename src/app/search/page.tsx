"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "../_components/Card";
import { Movie } from "@/app/types";
import { options } from "@/app/api";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setMovies(data.results?.slice(0, 20));
    };
    fetchMovies();
  }, [query]);

  // console.log(movies);
  //   const titles = movies?.map(title)=>(movies.title)

  return (
    <>
      <div className="font-bold p-8">Search results for "{query}"</div>
      <div className="flex justify-between w-[90%] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mx-auto">
          {movies?.map((movie: Movie, index: Number) => (
            <Card key={index} prop={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
