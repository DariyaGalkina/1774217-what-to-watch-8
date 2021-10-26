import { Genres } from './const';
import { FilmProps } from './types/film';

export const filterFilmsByGenre = (films: FilmProps[], genre: string): FilmProps[] => {
  if (genre === Genres.All) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
