import { createReducer } from '@reduxjs/toolkit';
import {
  requireAuthorization,
  requireLogout
} from '../action';
import { AuthorizationStatus } from '../../const';
import { AuthState } from '../../types/state';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
