import { FilmProps } from './film';

export type State = {
  currentGenre: string,
  filmList: FilmProps[],
  isDataLoaded: boolean,
}
