import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ActionType } from '../types/action';
import type {
  FilmFromServer,
  FilmProps
} from '../types/film';
import type { ReviewProps } from '../types/review';

export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genre: string) => ({payload: genre}),
);

export const filterFilms = createAction(
  ActionType.FilterFilms,
  (films: FilmProps[]) => ({payload: films}),
);

export const loadFilms = createAction(
  ActionType.LoadFilms,
  (films: FilmFromServer[]) => ({payload: films}),
);

export const loadFilm = createAction(
  ActionType.LoadFilm,
  (film: FilmFromServer) => ({payload: film}),
);

export const loadSimilarFilms = createAction(
  ActionType.LoadSimilarFilms,
  (films: FilmFromServer[]) => ({payload: films}),
);

export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: ReviewProps[]) => ({payload: reviews}),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({payload: authStatus}),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({payload: url}),
);
