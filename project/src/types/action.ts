import { AxiosInstance } from 'axios';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  changeGenre,
  filterFilms,
  loadFilms,
  loadFilm,
  requireAuthorization,
  requireLogout
} from '../store/action';
import { State } from './state';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
  LoadFilms = 'data/loadFilms',
  LoadFilm = 'data/loadFilm',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type Actions =
| ReturnType<typeof changeGenre>
| ReturnType<typeof filterFilms>
| ReturnType<typeof loadFilms>
| ReturnType<typeof loadFilm>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
