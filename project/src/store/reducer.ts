import { films } from '../mocks/films';
import {
  Actions,
  ActionType
} from '../types/action';
import type { State } from '../types/state';

const initialState: State = {
  genre: 'All genres',
  filmList: films,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload};
    case ActionType.FilterFilms:
      return {...state, filmList: action.payload};
    default:
      return state;
  }
};
