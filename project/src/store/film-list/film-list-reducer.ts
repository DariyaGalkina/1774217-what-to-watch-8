import { createReducer } from '@reduxjs/toolkit';
import { adaptFilmsToClient } from '../../utils';
import { loadFilms } from '../action';
import { FilmListState } from '../../types/state';

const initialState: FilmListState = {
  filmList: [],
  isDataLoaded: false,
};

export const filmListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.filmList = adaptFilmsToClient(action.payload);
      state.isDataLoaded = true;
    });
});
