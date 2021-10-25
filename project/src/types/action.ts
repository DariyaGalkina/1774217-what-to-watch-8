import { FilmProps } from './film';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export type FilterFilmsAction = {
  type: ActionType.FilterFilms,
  payload: FilmProps[],
}

export type Actions = ChangeGenreAction | FilterFilmsAction;
