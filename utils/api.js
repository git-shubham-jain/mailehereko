import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchMovies = async (searchTerm, type) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      apikey: API_KEY,
      s: searchTerm,
      type,
    },
  });
  console.log(response.data.Search,'data')
  return response.data.Search;
};

export const fetchMovieDetails = async (imdbID) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      apikey: API_KEY,
      i: imdbID,
    },
  });
  return response.data;
};

export const fetchMovieWithId = async (movieid) => {
  const response = await axios.get(
    `${BASE_URL}?apikey=${API_KEY}&i=${movieid}`
  );
  return response.data;
};
