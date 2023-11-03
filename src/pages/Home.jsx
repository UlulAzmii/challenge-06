import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../redux/slices/popularMoviesSlice';
import { searchMovies } from '../redux/slices/searchMoviesSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(
    (state) => state.popularMovies.popularMovies
  );
  const searchResults = useSelector(
    (state) => state.searchMovies.searchResults
  );

  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const baseUrl = 'https://shy-cloud-3319.fly.dev/api/v1';
  const imageUrl = useSelector((state) => state.popularMovies.imageUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(`${baseUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [token, isLoggedIn]);

  useEffect(() => {
    if (token) {
      dispatch(fetchPopularMovies(token));
    }
  }, [dispatch, token]);

  const handleSearch = (query) => {
    dispatch(searchMovies(token, query));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {isLoggedIn && ( // Menampilkan elemen ketika sudah login
            <div className="Movie-container">
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
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          )}
          <div className="row mt-3">
            {searchResults.length > 1
              ? searchResults.map((movie) => (
                  <div className="col-md-4 mb-3" key={movie.id}>
                    <div className="card">
                      <img
                        className="card-img-top Movie-image"
                        onClick={() =>
                          (window.location.href = `/DetailMovie/${movie.id}`)
                        }
                        src={`${imageUrl}/${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                  </div>
                ))
              : popularMovies.map((movie) => (
                  <div className="col-md-4 mb-3" key={movie.id}>
                    <div className="card">
                      <img
                        className="card-img-top Movie-image"
                        onClick={() =>
                          (window.location.href = `/DetailMovie/${movie.id}`)
                        }
                        src={`${imageUrl}/${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="col-md-4">
          {!isLoggedIn && (
            <h4 className="mt-4">Login Untuk Melihat Popular Movies</h4>
          )}
          {isLoggedIn ? (
            <div>
              <button className="allreg">Halo, {user.name}</button>
              <button
                className="allout"
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
                className="allreg mt-3"
                onClick={() => (window.location.href = `./SignUp`)}
              >
                SignUp
              </button>
              <button
                className="allmovie mt-3"
                onClick={() => (window.location.href = `./Login`)}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
