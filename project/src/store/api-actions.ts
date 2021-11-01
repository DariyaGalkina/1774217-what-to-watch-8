import { loadFilms } from './action';
import { APIRoute } from '../const';
import type { ThunkActionResult } from '../types/action';
import type { FilmFromServer } from '../types/film';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmFromServer[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };
