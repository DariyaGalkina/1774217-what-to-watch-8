import {
  loadFilm,
  loadFilms,
  loadReviews,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  requireLogout
} from './action';
import {
  dropToken,
  saveToken,
  Token
} from '../services/token';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus
} from '../const';
import type { AuthData } from '../types/auth-data';
import type { FilmFromServer } from '../types/film';
import type { ReviewProps } from '../types/review';
import type { ThunkActionResult } from '../types/action';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmFromServer[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };

export const fetchFilmAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmFromServer>(APIRoute.Film.replace(':id', `${filmId}`));
      dispatch(loadFilm(data));
    } catch {
      dispatch(redirectToRoute('/404'));
    }
  };

export const fetchSimilarFilmsAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmFromServer[]>(APIRoute.Similar.replace(':id', `${filmId}`));
    dispatch(loadSimilarFilms(data));
  };

export const fetchReviewsAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ReviewProps[]>(APIRoute.Reviews.replace(':id', `${filmId}`));
    dispatch(loadReviews(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      })
      // eslint-disable-next-line no-console
      .catch(() => console.log('TODO'));
  };

export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
