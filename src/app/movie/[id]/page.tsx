import Image from "next/image";

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
  console.log("seeking genres ---------", genres);

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

  return (
    <div className="mx-auto mt-6">
      <div>
        <div className="text-[24px]">
          <b>{movie.title}</b>
        </div>
        <div>
          <h1>{movie.release_date}</h1>
        </div>
        <div>
          <h1>{movie.runtime} Минут</h1>
        </div>
        <div>
          <h1>⭐️{movie.vote_average.toFixed(1)}/10</h1>
          <h1>{movie.vote_count}</h1>
        </div>
      </div>

      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden mx-auto mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt="Movie Poster"
          className="shadow-lg absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="relative w-[30%] h-[148px] sm:h-[200px] md:h-[250px] overflow-hidden mx-start mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="Movie Poster"
          className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div>
        <h1>Genres: {names}</h1>
      </div>
      <div>
        <h1>{movie.overview}</h1>
      </div>
      <div className="flex">
        <h1>Director:</h1>
        <h1>{director?.name}</h1>
      </div>
      <div className="flex">
        <h1>Writers:</h1>
        <Cast cast={writers} />
      </div>
      <div className="flex">
        <h1>Stars:</h1>
        <Cast cast={cast} />
      </div>
    </div>
  );
}