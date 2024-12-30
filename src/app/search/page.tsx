"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { options } from "../[category]/page";
import { Card } from "../_components/Card";

export default function Page() {
  const searchParams = useSearchParams();
  const genre = searchParams.get("with_genres");

  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setMovies(data.results?.slice(0, 5));
    };
    fetchMovies();
  }, [genre]);

  console.log(movies);
  //   const titles = movies?.map(title)=>(movies.title)

  return (
    <div className="flex justify-between w-[90%] mx-auto mt-12">
      <b className="flex">Result for {genre}</b>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mx-auto my-6">
        {movies?.map((movie: Movie, index: number) => (
          <Card key={index} prop={movie} />
        ))}
      </div>
    </div>
  );
}
