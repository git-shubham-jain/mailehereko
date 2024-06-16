import axios from 'axios';

const API_KEY = 'c052b918';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, type) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      apikey: API_KEY,
      s: searchTerm,
      type,
    },
  });
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
