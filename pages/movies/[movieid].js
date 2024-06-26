import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchMovieWithId } from "@/utils/api";

const Movies = () => {
  const router = useRouter();
  const { movieid } = router.query;
  const [movie, setMovie] = useState(null);

  const movieWithId = async () => {
    const movieData = await fetchMovieWithId(movieid);
    setMovie(movieData);
  };

  useEffect(() => {
    if (movieid) {
      movieWithId();
    }
  }, [movieid]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="text-white min-h-screen">
      <main className="p-4">
        <div className="relative">
          <img
            src={movie?.Poster}
            alt="Avengers: Endgame"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-zinc-800 bg-opacity-75 p-2 rounded-lg">
            <p className="text-sm text-zinc-400">Movies / Movies</p>
            <h1 className="text-2xl font-bold">{movie?.Title}</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <img
              src={movie?.Poster}
              alt="Avengers: Endgame Poster"
              className="rounded-lg"
            />
          </div>
          <div className="lg:w-2/3 lg:pl-8 mt-4 lg:mt-0">
            <h2 className="text-xl font-bold">{movie?.Plot} </h2>
            <div className="mt-4">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm">
                ⭐ 8.3
              </span>
            </div>
            <div className="mt-4">
              <p className="text-zinc-400">
                <span className="font-bold">Type:</span> {movie?.Type}
              </p>
              <p className="text-zinc-400">
                <span className="font-bold">Release Date:</span>{" "}
                {movie?.Released}
              </p>
              <p className="text-zinc-400">
                <span className="font-bold">Run time:</span> {movie?.Runtime}
              </p>
              <p className="text-zinc-400">
                <span className="font-bold">Genres:</span> {movie?.genre}
                Fiction, Action
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Movies;
