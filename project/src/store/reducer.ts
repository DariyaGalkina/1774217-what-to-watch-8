import { films } from '../mocks/films';
import { filterFilmsByGenre } from '../utils';
import { Genres } from '../const';
import {
  Actions,
  ActionType
} from '../types/action';
import type { State } from '../types/state';

const initialState: State = {
  currentGenre: Genres.All,
  filteredFilms: films,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};
    case ActionType.FilterFilms:
      return {...state, filteredFilms: filterFilmsByGenre(action.payload, state.currentGenre)};
    default:
      return state;
  }
};
