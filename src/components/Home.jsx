import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [imageUrl] = useState('https://image.tmdb.org/t/p/w500');
  const baseUrl = 'https://shy-cloud-3319.fly.dev/api/v1';

  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios
        .get('https://shy-cloud-3319.fly.dev/api/v1/auth/me')
        .then((response) => {
          console.log(response.data);
          setUser(response.data.data);
        })
        .catch((error) => console.log(error.response));
    };
    fetchData();
  }, [token]);

  const getMovieList = async () => {
    const movie = await axios.get(`${baseUrl}/movie/popular`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return movie.data.data;
  };

  const searchMovie = async (q) => {
    const search = await axios.get(
      `${baseUrl}/search/movie?page=1&query=${q}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(search.data);
    return search.data.data;
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const result = await getMovieList();
        setPopularMovies(result);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };
    if (token) {
      fetchPopularMovies();
    }
  }, []);

  const PopularMovieList = () => {
    return popularMovies?.map((movie, i) => (
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
        setPopularMovies(query);
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
        {isLoggedIn ? (
          <div>
            <p className="allName" style={{ textDecoration: 'none' }}>
              Halo, {user.name}
            </p>
            <button
              className="allmovie"
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                window.location.href = '/';
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              href=""
              className="allreg"
              onClick={() => (window.location.href = `./SignUp`)}
              style={{ textDecoration: 'none' }}
            >
              SignUp
            </button>
            <button
              href=""
              className="allmovie"
              onClick={() => (window.location.href = `./Login`)}
              style={{ textDecoration: 'none' }}
            >
              Login
            </button>
          </div>
        )}
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
      {!isLoggedIn && (
        <h1 className="text-center m-5">
          Login Untuk Melihat Popularmovies
        </h1>
      )}
    </div>
  );
};

export default Home;
