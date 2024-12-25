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

export default async function Page() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  );
  if (!res.ok) {
    console.error("Failed to fetch data", res.statusText);
    throw new Error("Failed to fetch movies");
  }
  const data = await res.json();
  return (
    <div>
      <h1>Movie ID: {data.results[0].id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
