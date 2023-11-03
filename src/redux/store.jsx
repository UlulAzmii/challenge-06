import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import popularMoviesReducer from './slices/popularMoviesSlice';
import detailMoviesReducer from './slices/detailMoviesSlice';
import searchMoviesReducer from './slices/searchMoviesSlice';
import authReducers from './reducers/authReducers';
import thunk from 'redux-thunk';

const isReduxDevToolsExtensionAvailable =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore({
  reducer: {
    authReducers: authReducers,
    popularMovies: popularMoviesReducer,
    detailMovies: detailMoviesReducer,
    searchMovies: searchMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
  devTools: isReduxDevToolsExtensionAvailable,
});

export default store;
