import { FilmProps } from './film';

export type State = {
  currentGenre: string,
  filmList: FilmProps[],
  filteredFilms: FilmProps[],
  isDataLoaded: boolean,
}
