import { AuthorizationStatus } from '../const';
import type { FilmProps } from '../types/film';
import type { ReviewProps } from '../types/review';
import type { State } from '../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
export const getFilmList = (state: State): FilmProps[] => state.filmList;
export const getFilteredFilms = (state: State): FilmProps[] => state.filteredFilms;
export const getSimilarFilms = (state: State): FilmProps[] => state.similarFilms;
export const getReviews = (state: State): ReviewProps[] => state.reviews;
export const getCurrentFilm = (state: State): FilmProps => state.currentFilm;
export const getCurrentGenre = (state: State): string => state.currentGenre;
export const getIsDataLoaded = (state: State): boolean => state.isDataLoaded;
export const getIsSimilarFilmsLoaded = (state: State): boolean => state.isSimilarFilmsLoaded;
export const getIsReviewsLoaded = (state: State): boolean => state.isReviewsLoaded;
