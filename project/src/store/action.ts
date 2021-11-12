import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ActionType } from '../types/action';
import type {
  FilmFromServer,
  FilmProps
} from '../types/film';
import type { ReviewProps } from '../types/review';

// export const changeGenre = (genre: string) => ({
//   type: ActionType.ChangeGenre,
//   payload: genre,
// } as const);

export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genre: string) => ({payload: genre}),
);

// export const filterFilms = (films: FilmProps[]) => ({
//   type: ActionType.FilterFilms,
//   payload: films,
// } as const);

export const filterFilms = createAction(
  ActionType.FilterFilms,
  (films: FilmProps[]) => ({payload: films}),
);

// export const loadFilms = (films: FilmFromServer[]) => ({
//   type: ActionType.LoadFilms,
//   payload: films,
// } as const);

export const loadFilms = createAction(
  ActionType.LoadFilms,
  (films: FilmFromServer[]) => ({payload: films}),
);

// export const loadFilm = (film: FilmFromServer) => ({
//   type: ActionType.LoadFilm,
//   payload: film,
// } as const);

export const loadFilm = createAction(
  ActionType.LoadFilm,
  (film: FilmFromServer) => ({payload: film}),
);

// export const loadSimilarFilms = (films: FilmFromServer[]) => ({
//   type: ActionType.LoadSimilarFilms,
//   payload: films,
// } as const);

export const loadSimilarFilms = createAction(
  ActionType.LoadSimilarFilms,
  (films: FilmFromServer[]) => ({payload: films}),
);

// export const loadReviews = (reviews: ReviewProps[]) => ({
//   type: ActionType.LoadReviews,
//   payload: reviews,
// } as const);

export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: ReviewProps[]) => ({payload: reviews}),
);

// export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
//   type: ActionType.RequireAuthorization,
//   payload: authStatus,
// } as const);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({payload: authStatus}),
);

// export const requireLogout = () => ({
//   type: ActionType.RequireLogout,
// } as const);

export const requireLogout = createAction(ActionType.RequireLogout);

// export const redirectToRoute = (url: string) => ({
//   type: ActionType.RedirectToRoute,
//   payload: url,
// } as const);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({payload: url}),
);
