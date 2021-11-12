import { createReducer } from '@reduxjs/toolkit';
import {
  adaptFilmsToClient,
  adaptToClient
} from '../../utils';
import {
  loadFilm,
  loadReviews,
  loadSimilarFilms
} from '../action';
import type { FilmProps } from '../../types/film';
import { CurrentFilmState } from '../../types/state';

const initialState: CurrentFilmState = {
  currentFilm: {} as FilmProps,
  similarFilms: [],
  reviews: [],
  isSimilarFilmsLoaded: false,
  isReviewsLoaded: false,
};

export const currentFilmReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilm, (state, action) => {
      state.currentFilm = adaptToClient(action.payload);
      state.isSimilarFilmsLoaded = false;
      state.isReviewsLoaded = false;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = adaptFilmsToClient(action.payload);
      state.isSimilarFilmsLoaded = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isReviewsLoaded = true;
    });
});
