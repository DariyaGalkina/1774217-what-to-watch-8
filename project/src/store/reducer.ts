import {
  adaptFilmsToClient,
  adaptToClient,
  filterFilmsByGenre
} from '../utils';
import {
  AuthorizationStatus,
  Genres
} from '../const';
import {
  Actions,
  ActionType
} from '../types/action';
import type { State } from '../types/state';
import { FilmProps } from '../types/film';

const initialState: State = {
  currentGenre: Genres.All,
  currentFilm: {} as FilmProps,
  filmList: [],
  filteredFilms: [],
  similarFilms: [],
  reviews: [],
  isDataLoaded: false,
  isSimilarFilmsLoaded: false,
  isReviewsLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};
    case ActionType.FilterFilms:
      return {...state, filteredFilms: filterFilmsByGenre(action.payload, state.currentGenre)};
    case ActionType.LoadFilms: {
      const adaptedFilms = adaptFilmsToClient(action.payload);

      return {
        ...state,
        filmList: adaptedFilms,
        filteredFilms: adaptedFilms,
        isDataLoaded: true,
      };
    }
    case ActionType.LoadFilm:
      return {
        ...state,
        currentFilm: adaptToClient(action.payload),
        similarFilms: [],
        reviews: [],
        isSimilarFilmsLoaded: false,
        isReviewsLoaded: false,
      };
    case ActionType.LoadSimilarFilms:
      return {
        ...state,
        similarFilms: adaptFilmsToClient(action.payload),
        isSimilarFilmsLoaded: true,
      };
    case ActionType.LoadReviews:
      return {
        ...state,
        reviews: action.payload,
        isReviewsLoaded: true,
      };
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};
