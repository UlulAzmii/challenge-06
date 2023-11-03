import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  popularMovies: [],
  loading: false,
  error: null,
  imageUrl: 'https://image.tmdb.org/t/p/w500', 
};

const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPopularMovies, setLoading, setError } =
  popularMoviesSlice.actions;

export const fetchPopularMovies = (token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      'https://shy-cloud-3319.fly.dev/api/v1/movie/popular',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPopularMovies(response.data.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default popularMoviesSlice.reducer;
