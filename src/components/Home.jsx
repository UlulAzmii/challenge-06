import React, { useEffect, useState } from 'react';
import { getMovieList, searchMovie } from './api';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [imageUrl] = useState('https://image.tmdb.org/t/p/w500');

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const result = await getMovieList();
        setPopularMovies(result);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => (
      <div className="Movie-wrapper" key={i}>
        <img
          onClick={() => (window.location.href = `/detail/${movie.id}`)}
          className="Movie-image"
          src={`${imageUrl}/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
    ));
  };

  const search = async (q) => {
    if (q.length > 3) {
      try {
        const query = await searchMovie(q);
        setPopularMovies(query.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <a
          href=""
          className="popular"
          onClick={() => window.location.reload(true)}
          style={{ textDecoration: 'none' }}
        >
          Popular Movie
        </a>
        <input
          placeholder="Cari film..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <a
          href=""
          className="allmovie"
          onClick={() => window.location.reload(true)}
          style={{ textDecoration: 'none' }}
        >
          See All Movie
        </a>
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default Home;
