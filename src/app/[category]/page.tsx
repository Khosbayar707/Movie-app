"use client";

import { Card } from "../_components/Card";
import { ArrowRight } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { PaginationSeeMore } from "../_components/PaginationSeeMore";
import { Movie } from "../types";
import { options } from "../api";

type Props = {
  params: Params;
};
type Params = {
  category: string;
};

export type PageInfo = {
  totalPages: number;
  currentPages: number;
};

export default function Page() {
  //   console.log("param----", props);
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [movies, setMovies] = useState<Movie[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPages: 0,
    currentPages: 0,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params?.category}?language=en-US&page=${page}`,
        options
      );
      const data = await response.json();
      setMovies(data.results?.slice(0, 12));
      setPageInfo({ currentPages: Number(page), totalPages: data.total_pages });
    };
    fetchMovies();
  }, [page, params.category]);
  // console.log(movies);
  return (
    <div>
      <div className="flex justify-between w-[90%] mx-auto mt-12">
        <b className="text-lg">
          {String(params.category).toUpperCase().replaceAll("_", " ")}
        </b>
        <button className="flex">
          See more <ArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
        <Suspense>
          {movies?.map((movie: Movie, index: number) => (
            <Card key={index} prop={movie} />
          ))}
        </Suspense>
      </div>
      <PaginationSeeMore pageInfo={pageInfo} />
    </div>
  );
}
