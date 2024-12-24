export function Card({ title, poster, vote }) {
  return (
    <div className="w-[180px] mx-2 my-2 rounded-lg shadow-lg bg-white">
      <img
        src={`https://image.tmdb.org/t/p/w185/${poster}`}
        alt={`${title} Poster`}
        className="w-full h-auto rounded-lg"
      />
      <div className="p-4">
        <b>{title}</b>
        <p className="text-[12px] mt-2">⭐️{vote}/10</p>
      </div>
    </div>
  );
}
