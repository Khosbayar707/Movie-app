import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const API_KEY = "f39690f9830ce804b7894ac1def4f7e9";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};

export default async function Page({ params }) {
  const res = await fetch(
    ` https://api.themoviedb.org/3/movie/${params.id}`,
    options
  );
  const data = await res.json();
  const movie = data;
  const genres = data?.genres;
  // console.log("seeking genres ---------", genres);

  const names = genres.map((genre) => genre.name);

  const resCredit = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/credits`,
    options
  );
  const dataCredit = await resCredit.json();
  const movieCredits = dataCredit;
  const crew = movieCredits?.crew;
  const cast = movieCredits?.cast;

  const director = crew.find((cr) => cr.job === "Director");
  const writers = crew.filter((wr) => wr.department === "Writing");

  const Cast = ({ cast }) => {
    return (
      <div>
        {cast?.slice(0, 3).map((member, index) => (
          <div key={index}>{member.name}</div>
        ))}
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
          <button className="flex">
            See more <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
