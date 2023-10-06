import axios from 'axios';

const apiKey = '1f093e8dd14a8aacaa3b08f454c4309c';
const baseUrl = 'https://api.themoviedb.org/3';

export const getMovieList = async () => {
  const movie = await axios.get(
    `${baseUrl}/movie/popular?api_key=${apiKey}`
  );
  return movie.data.results;
};

export const searchMovie = async (q) => {
  const search = await axios.get(
    `${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`
  );
  return search.data;
};
