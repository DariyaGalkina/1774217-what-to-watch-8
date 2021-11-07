import { FilmProps } from './film';
import { AuthorizationStatus } from '../const';
import { ReviewProps } from './review';

export type State = {
  currentGenre: string,
  currentFilm: FilmProps | null,
  filmList: FilmProps[],
  filteredFilms: FilmProps[],
  similarFilms: FilmProps[],
  reviews: ReviewProps[],
  isDataLoaded: boolean,
  isSimilarFilmsLoaded: boolean,
  isReviewsLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}
