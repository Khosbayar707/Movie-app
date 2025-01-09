"use client";

import { Suspense, useEffect, useState } from "react";
import { options } from "../api";
import { useSearchParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [genres, setGenres] = useState<Genre[]>();
  const [genreName, setGenreName] = useState<string>("");
  const searchParams = useSearchParams();
  const genreId = searchParams.get("with_genres");

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const data = await response.json();
      console.log("genre data ----", data);
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const chosenGenre = genres?.find((el) => el.id === Number(genreId));
    if (chosenGenre) {
      setGenreName(chosenGenre.name);
    }
  }, [genreId]);

  return (
    <main>
      <b className="p-8">Results for "{genreName}"</b>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}
