"use client";
import { ArrowRight } from "lucide-react";
import { Card } from "@/app/_components/Card";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { options } from "@/app/api";
import { Movie } from "@/app/types";
// import { Pagination } from "@/app/_components/Pagination";
// import { PageInfo } from "@/app/[category]/page";

export default function Recommend() {
  const pathname = usePathname();
  const [movies, setMovies] = useState<Movie[]>();
  // const [pageInfo, setPageInfo] = useState<PageInfo>({
  //   totalPages: 0,
  //   currentPages: 0,
  // });

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
  }, [movies]);
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
          <Card prop={movie} key={`movie/${movie.id}`} />
        ))}
      </div>
    </div>
  );
}
