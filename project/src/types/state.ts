import { FilmProps } from './film';
import { AuthorizationStatus } from '../const';

export type State = {
  currentGenre: string,
  currentFilm: FilmProps | null,
  filmList: FilmProps[],
  filteredFilms: FilmProps[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
