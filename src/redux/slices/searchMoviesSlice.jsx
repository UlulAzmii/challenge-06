import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchResults, setLoading, setError } = searchMoviesSlice.actions;

export const searchMovies = (token, query) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    if (query.length > 2) {
      const imageUrl = getState().popularMovies.imageUrl;
      
      const response = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${query}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const searchResultsWithImageUrl = response.data.data.map((movie) => ({
        ...movie,
        imageUrl: `${imageUrl}/${movie.poster_path}`,
      }));

      dispatch(setSearchResults(searchResultsWithImageUrl));
    }
  } catch (error) {
    dispatch(setError(error.message));
    console.error('Error searching movies:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default searchMoviesSlice.reducer;
