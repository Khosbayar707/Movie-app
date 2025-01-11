"use client";

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/app/_components/Card";
import Link from "next/link";
import { options } from "@/app/api";
import { Movie } from "@/app/types";
import { Suspense, useEffect, useState } from "react";
import { use } from "react";

type Genre = {
  id: number;
  name: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page(props: Props) {
  const params = use(props.params);
  const [movies, setMovies] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}`,
          options
        );
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovies();
  }, [params.id]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/credits`,
          options
        );
        const data = await res.json();
        setCredits(data);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };
    fetchCredits();
  }, [params.id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/recommendations`,
          options
        );
        const data = await res.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [params.id]);

  // Extract necessary data
  const genreNames = movies?.genres?.map((genre: Genre) => genre.name) || [];
  const crew = credits?.crew || [];
  const cast = credits?.cast || [];
  const director = crew.find((cr: any) => cr.job === "Director");
  const writers = crew.filter((wr: any) => wr.department === "Writing");
  const movieSimilar = recommendations?.results || [];

  const Time = () => {
    if (!movies?.runtime) return null;
    const hours = Math.floor(movies.runtime / 60);
    const minutes = movies.runtime % 60;
    return <h1>{`${hours}h ${minutes}`} </h1>;
  };

  const Cast = ({ cast }: { cast: any[] }) => (
    <div>
      <Suspense>
        {cast.slice(0, 3).map((member) => (
          <div key={member.id}>{member.name}</div>
        ))}
      </Suspense>
    </div>
  );

  return (
    <div className="">
      <div className="mx-auto mt-6">
        <div>
          <div className="text-[24px] mx-auto w-[90%]">
            <b>{movies?.title}</b>
          </div>
          <div className="mx-auto w-[90%]">
            <div className="flex justify-between">
              <div>
                <h1>{movies?.release_date}</h1>
                <Time />
              </div>
              <div>
                <h1>⭐️{movies?.vote_average?.toFixed(1)}/10</h1>
                <h1>{movies?.vote_count} votes</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-wrap">
          <div className="relative w-full h-[350px] overflow-hidden mx-auto mt-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies?.backdrop_path}`}
              alt="Movie Poster"
              className="shadow-lg absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex items-start gap-4 mx-auto w-[90%]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies?.poster_path}`}
              alt="Movie Poster"
              className="mt-4 w-auto h-[350px]"
            />
            <Suspense>
              <div>
                <div className="font-bold p-4">
                  <h1>
                    Genres:
                    {genreNames.map((name: string, index: any) => (
                      <Badge
                        key={index}
                        style={{
                          border: "1px solid white",
                          backgroundColor: "black",
                          color: "white",
                          marginLeft: 10,
                        }}
                      >
                        {name}
                      </Badge>
                    ))}
                  </h1>
                </div>
                <div className="text-justify">{movies?.overview}</div>
              </div>
            </Suspense>
          </div>
        </div>
        <div className="w-[90%] mx-auto flex justify-between border-b border-gray-700 pb-2 my-4">
          <b>Director:</b>
          <h1>{director?.name}</h1>
        </div>
        <div className="w-[90%] mx-auto flex justify-between border-b border-gray-700 pb-2 mb-4">
          <b>Writers:</b>
          <Cast cast={writers} />
        </div>
        <div className="w-[90%] mx-auto flex justify-between border-b border-gray-700 pb-2 mb-4">
          <b>Stars:</b>
          <Cast cast={cast} />
        </div>
        <div className="flex justify-between w-[90%] mx-auto mt-12">
          <b className="text-lg">More like this</b>
          <Link href={`${params.id}/recommendations`}>
            <button className="flex">
              See more <ArrowRight />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
          <Suspense>
            {movieSimilar.slice(0, 8).map((movie: Movie) => (
              <Card key={movie.id} prop={movie} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
