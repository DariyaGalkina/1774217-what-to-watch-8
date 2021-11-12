import { createReducer } from '@reduxjs/toolkit';
import {
  adaptFilmsToClient,
  adaptToClient,
  filterFilmsByGenre
} from '../utils';
import {
  changeGenre,
  filterFilms,
  loadFilm,
  loadFilms,
  loadReviews,
  loadSimilarFilms,
  requireAuthorization,
  requireLogout
} from './action';
import {
  AuthorizationStatus,
  Genres
} from '../const';
// import { ActionType } from '../types/action';
import type { State } from '../types/state';
import type { FilmProps } from '../types/film';

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

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload;
    })
    .addCase(filterFilms, (state, action) => {
      state.filteredFilms = filterFilmsByGenre(action.payload, state.currentGenre);
    })
    .addCase(loadFilms, (state, action) => {
      const adaptedFilms = adaptFilmsToClient(action.payload);

      state.filmList = adaptedFilms;
      state.filteredFilms = adaptedFilms;
      state.isDataLoaded = true;
    })
    .addCase(loadFilm, (state, action) => {
      state.currentFilm = adaptToClient(action.payload);
      state.isSimilarFilmsLoaded = false;
      state.isReviewsLoaded = false;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = adaptFilmsToClient(action.payload);
      state.isSimilarFilmsLoaded = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isReviewsLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

// export const reducer = (state: State = initialState, action: Actions): State => {
//   switch (action.type) {
//     case ActionType.ChangeGenre:
//       return {...state, currentGenre: action.payload};
//     case ActionType.FilterFilms:
//       return {...state, filteredFilms: filterFilmsByGenre(action.payload, state.currentGenre)};
//     case ActionType.LoadFilms: {
//       const adaptedFilms = adaptFilmsToClient(action.payload);

//       return {
//         ...state,
//         filmList: adaptedFilms,
//         filteredFilms: adaptedFilms,
//         isDataLoaded: true,
//       };
//     }
//     case ActionType.LoadFilm:
//       return {
//         ...state,
//         currentFilm: adaptToClient(action.payload),
//         isSimilarFilmsLoaded: false,
//         isReviewsLoaded: false,
//       };
//     case ActionType.LoadSimilarFilms:
//       return {
//         ...state,
//         similarFilms: adaptFilmsToClient(action.payload),
//         isSimilarFilmsLoaded: true,
//       };
//     case ActionType.LoadReviews:
//       return {
//         ...state,
//         reviews: action.payload,
//         isReviewsLoaded: true,
//       };
//     case ActionType.RequireAuthorization:
//       return {...state, authorizationStatus: action.payload};
//     case ActionType.RequireLogout:
//       return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
//     default:
//       return state;
//   }
// };
