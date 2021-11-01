import {
  adaptFilmsToClient,
  filterFilmsByGenre
} from '../utils';
import { Genres } from '../const';
import {
  Actions,
  ActionType
} from '../types/action';
import type { State } from '../types/state';

const initialState: State = {
  currentGenre: Genres.All,
  filmList: [],
  filteredFilms: [],
  isDataLoaded: false,
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
    default:
      return state;
  }
};
