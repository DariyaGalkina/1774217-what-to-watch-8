import {
  ActionType,
  ChangeGenreAction,
  FilterFilmsAction
} from '../types/action';
import type { FilmProps } from '../types/film';

export const changeGenre = (genre: string): ChangeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const filterFilms = (films: FilmProps[]): FilterFilmsAction => ({
  type: ActionType.FilterFilms,
  payload: films,
});
