import { createReducer } from '@reduxjs/toolkit';
import { adaptFilmsToClient, adaptToClient } from '../../utils';
import { loadFilms, loadPromo } from '../action';
import { FilmListState } from '../../types/state';
import { FilmProps } from '../../types/film';

const initialState: FilmListState = {
  promo: {} as FilmProps,
  filmList: [],
  isDataLoaded: false,
};

export const filmListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.filmList = adaptFilmsToClient(action.payload);
      state.isDataLoaded = true;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = adaptToClient(action.payload);
    });
});
