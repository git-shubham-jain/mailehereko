import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import { fetchMovieDetails, fetchMovies } from "@/utils/api";

const Home = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('movie');
  const [type,setType]=useState('')
  const router = useRouter();

  const fetchMoviesData = useCallback(async () => {
    try {
      const movies = await fetchMovies(searchTerm, type);

      if (!Array.isArray(movies)) {
        throw new TypeError('Expected an array of movies');
      }

      const moviesWithRatings = await Promise.all(
        movies.map(async (movie) => {
          const movieDetails = await fetchMovieDetails(movie.imdbID);
          return movieDetails;
        })
      );

      setData(moviesWithRatings);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [searchTerm, type]);

  useEffect(() => {
    fetchMoviesData()
  }, [searchTerm,type,fetchMoviesData]);

  const handleMovieClick = (imdbID) => {
    router.push(`/movies/${imdbID}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedHandleInputChange = useCallback(debounce(handleInputChange, 500), []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#152643] to-[#14231a] text-white">
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
        </div>
        <nav className="space-x-6">
          <a href="#" className="hover:text-zinc-400">
            Movies
          </a>
          <a href="#" className="hover:text-zinc-400">
            TV Shows
          </a>
          <a href="#" className="hover:text-zinc-400">
            Suggest me →
          </a>
        </nav>
      </header>

      <main className="p-6">
        <section className="mb-8 max-w-[36%]">
          <h1 className="text-5xl font-bold mb-2">MaileHereko</h1>
          <p className="text-zinc-400">
            List of movies and TV shows I have watched till date. Explore what I
            have watched and feel free to make a suggestion. 😊
          </p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search Movies or TV Shows"
              className="w-full p-2 rounded bg-zinc-800 placeholder-zinc-500"
              onChange={debouncedHandleInputChange}
            />
          </div>
        </section>
        <div className="flex space-x-4 mb-6">
          <button onClick={()=>setType('')} className={`px-4 py-2 rounded-lg ${type===''?'bg-purple-500':'bg-zinc-700'}`}>All</button>
          <button onClick={()=>setType('movie')} className={`px-4 py-2 rounded-lg ${type==='movie'?'bg-purple-500':'bg-zinc-700'}`}>Movies</button>
          <button onClick={()=>setType('series')} className={`px-4 py-2 rounded-lg ${type==='series'?'bg-purple-500':'bg-zinc-700'}`}>TV Shows</button>
        </div>
        <h2 className="text-2xl mb-4">All ({data?.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((movie, index) => (
            <div key={index} onClick={() => handleMovieClick(movie.imdbID)} className="bg-zinc-700 p-4 rounded-lg">
              <Image
                loader={() => movie.Poster}
                src={movie.Poster}
                alt="img"
                width={300}
                height={300}
                layout="responsive"
                className="rounded-lg mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg">{movie.Title}</h3>
                <span className="bg-yellow-500 text-black px-2 py-1 rounded-lg">
                  {movie.imdbRating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const searchTerm = 'movie';
    const type = '';
    const movies = await fetchMovies(searchTerm, type);

    if (!Array.isArray(movies)) {
      throw new TypeError('Expected an array of movies');
    }

    const moviesWithRatings = await Promise.all(
      movies.map(async (movie) => {
        const movieDetails = await fetchMovieDetails(movie.imdbID);
        return movieDetails;
      })
    );

    return { props: { initialData: moviesWithRatings } };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { props: { initialData: [] } };
  }
};

export default Home;
