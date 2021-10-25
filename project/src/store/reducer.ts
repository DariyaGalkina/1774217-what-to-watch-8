import { films } from '../mocks/films';
import { filterFilmsByGenre } from '../utils';
import { Genres } from '../const';
import {
  Actions,
  ActionType
} from '../types/action';
import type { State } from '../types/state';

const initialState: State = {
  genre: Genres.All,
  filmList: films,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload};
    case ActionType.FilterFilms:
      return {...state, filmList: filterFilmsByGenre(action.payload, state.genre)};
    default:
      return state;
  }
};
