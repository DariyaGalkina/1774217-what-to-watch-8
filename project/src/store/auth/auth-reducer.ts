import { createReducer } from '@reduxjs/toolkit';
import {
  loadFavorite,
  requireAuthorization,
  requireLogout
} from '../action';
import { AuthorizationStatus } from '../../const';
import { AuthState } from '../../types/state';
import { adaptFilmsToClient } from '../../utils';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favoriteFilms: [],
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.favoriteFilms = [];
    })
    .addCase(loadFavorite, (state, action) => {
      state.favoriteFilms = adaptFilmsToClient(action.payload);
    });
});
