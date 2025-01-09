import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/app/_components/Card";
import Link from "next/link";
import { options } from "@/app/api";
import { Movie } from "@/app/types";
import { Suspense } from "react";

type genre = {
  id: number;
  name: string;
};
type Props = {
  params: {
    id: string;
  };
};
export default async function Page(props: any) {
  const res = await fetch(
    ` https://api.themoviedb.org/3/movie/${props.params.id}`,
    options
  );
  const data = await res.json();
  const movie = data;
  const genres = data?.genres;
  // console.log("seeking genres ---------", genres);

  const names = genres.map((genre: genre) => genre.name);

  const resCredit = await fetch(
    `https://api.themoviedb.org/3/movie/${props.params.id}/credits`,
    options
  );
  const dataCredit = await resCredit.json();
  const movieCredits = dataCredit;
  const crew = movieCredits?.crew;
  const cast = movieCredits?.cast;

  const director = crew.find((cr: any) => cr.job === "Director");
  const writers = crew.filter((wr: any) => wr.department === "Writing");

  const resSimilar = await fetch(
    `https://api.themoviedb.org/3/movie/${props.params.id}/recommendations`,
    options
  );
  const dataSimilar = await resSimilar.json();
  const movieSimilar = dataSimilar.results;

  // const FirstTwoMovies = movieSimilar
  //   .map((movie) => {
  //     return <div>{movie.title}</div>;
  //   })
  //   .slice(0, 2);
  // console.log("title----- ", FirstTwoMovies);
  // console.log(movieCredits);
  const Cast = ({ cast }: { cast: any }) => {
    return (
      <div>
        <Suspense>
          {cast?.slice(0, 3).map((member: any) => (
            <div>{member.name}</div>
          ))}
        </Suspense>
      </div>
    );
  };

  const Time = () => {
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    return <h1>{`${hours}h ${minutes}`} </h1>;
  };

  return (
    <div className="">
      <div className="mx-auto mt-6">
        <div>
          <div className="text-[24px] mx-auto w-[90%]">
            <b>{movie.title}</b>
          </div>
          <div className="mx-auto w-[90%]">
            <div className="flex justify-between">
              <div>
                <h1>{movie.release_date}</h1>
                <Time />
              </div>
              <div>
                <h1>⭐️{movie.vote_average.toFixed(1)}/10</h1>
                <h1>{movie.vote_count} votes</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-wrap">
          <div className="relative w-full h-[350px] overflow-hidden mx-auto mt-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt="Movie Poster"
              className="shadow-lg absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex items-start gap-4 mx-auto w-[90%]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="Movie Poster"
              className="mt-4 w-[auto] h-[350px]"
            />
            <div>
              <div className="font-bold p-4">
                <h1>
                  Genres:
                  <Badge
                    style={{
                      border: "1px solid white",
                      backgroundColor: "black",
                      color: "white",
                      marginLeft: 10,
                    }}
                  >
                    {names[0]}
                  </Badge>
                  <Badge
                    style={{
                      border: "1px solid white",
                      backgroundColor: "black",
                      color: "white",
                      marginLeft: 10,
                    }}
                  >
                    {names[1]}
                  </Badge>
                  <Badge
                    style={{
                      border: "1px solid white",
                      backgroundColor: "black",
                      color: "white",
                      marginLeft: 10,
                    }}
                  >
                    {names[2]}
                  </Badge>
                </h1>
              </div>
              <div className="text-justify">{movie.overview}</div>
            </div>
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
          <Link href={`${props.params.id}/recommendations`}>
            <button className="flex">
              See more <ArrowRight />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
          <Suspense>
            {movieSimilar &&
              movieSimilar.slice(0, 8).map((movie: Movie) => {
                return <Card prop={movie} />;
              })}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
