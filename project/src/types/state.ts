import { RootState } from '../store/root-reducer';
import { AuthorizationStatus } from '../const';
import type { FilmProps } from '../types/film';
import type { ReviewProps } from '../types/review';

export type FilmListState = {
  filmList: FilmProps[],
  isDataLoaded: boolean,
};

export type FilterState = {
  currentGenre: string,
  filteredFilms: FilmProps[],
};

export type CurrentFilmState = {
  currentFilm: FilmProps,
  similarFilms: FilmProps[],
  reviews: ReviewProps[],
  isSimilarFilmsLoaded: boolean,
  isReviewsLoaded: boolean,
};

export type AuthState = {
  authorizationStatus: AuthorizationStatus,
}

export type State = RootState;
