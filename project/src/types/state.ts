import { FilmProps } from './film';
import { AuthorizationStatus } from '../const';

export type State = {
  currentGenre: string,
  filmList: FilmProps[],
  filteredFilms: FilmProps[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
