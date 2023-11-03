import { createSlice } from '@reduxjs/toolkit';

const baseUrl = 'https://shy-cloud-3319.fly.dev/api/v1';

const initialState = {
  filmDetail: null,
  loading: false,
  error: null,
};

const detailMoviesSlice = createSlice({
  name: 'detailMovies',
  initialState,
  reducers: {
    setFilmDetail: (state, action) => {
      state.filmDetail = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setFilmDetail, setLoading, setError } = detailMoviesSlice.actions;

export const fetchFilmDetail = (Id, token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`${baseUrl}/movie/${Id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    dispatch(setFilmDetail(data.data));
  } catch (error) {
    dispatch(setError(error.message));
    console.error('Error fetching film detail:', error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export default detailMoviesSlice.reducer;
