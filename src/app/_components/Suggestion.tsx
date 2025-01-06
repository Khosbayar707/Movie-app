"use client";

import { useEffect, useState } from "react";
import { options } from "../api";
import { Movie } from "../types";
import { ResultCard } from "./ResultCard";
import Link from "next/link";

export function Suggestion({ searchValue }) {
  const [movies, setMovies] = useState<Movie[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchValue) {
      setIsOpen(true);
      const fetchMovies = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setMovies(data.results?.slice(0, 4));
        // console.log("searched data----", data);
      };
      fetchMovies();
    } else {
      setIsOpen(false);
    }
  }, [searchValue]);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="mx-auto absolute z-10">
      {isOpen && (
        <div className="border-2 border-gray-#E4E4E7 rounded-lg overflow-hidden min-w-[80%]">
          {movies?.map((movie: Movie, index: number) => (
            <div key={index} onClick={closeDropdown}>
              <ResultCard prop={movie} />
            </div>
          ))}
          {searchValue && (
            <Link href={`/search?query=${searchValue}`} onClick={closeDropdown}>
              <div className="bg-secondary text-sm text-center p-2">
                See all results for "{searchValue}"
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
