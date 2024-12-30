"use client";
import { Badge } from "@/components/ui/badge";
import { options } from "../[category]/page";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Genre = () => {
  const [genres, setGenres] = useState();
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const data = await response.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, [genres]);

  const onClickGenre = (genreId: number) => {
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger className="flex border p-[5px] rounded-lg shadow-sm text-[14px]">
          Genre
          <ChevronDown />
        </PopoverTrigger>
        <PopoverContent className="rounded-xl">
          {genres?.map((genre) => (
            <Link href={`/search?with_genres=${genre.id}`}>
              <Badge className="rounded-2xl m-1" key={`genre-${genre.id}`}>
                {genre?.name} <ChevronRight />
              </Badge>
            </Link>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
