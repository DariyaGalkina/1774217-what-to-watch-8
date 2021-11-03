import { FilmProps } from './film';
import { AuthorizationStatus } from '../const';

export type State = {
  currentGenre: string,
  currentFilm: FilmProps | null,
  filmList: FilmProps[],
  filteredFilms: FilmProps[],
  similarFilms: FilmProps[],
  isDataLoaded: boolean,
  isSimilarFilmsLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
