import { ActionType } from '../types/action';
import type { FilmProps } from '../types/film';

export const changeGenre = (genre: string) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const filterFilms = (films: FilmProps[]) => ({
  type: ActionType.FilterFilms,
  payload: films,
} as const);

export const loadFilms = (films: FilmProps[]) => ({
  type: ActionType.LoadFilms,
  payload: films,
} as const);
