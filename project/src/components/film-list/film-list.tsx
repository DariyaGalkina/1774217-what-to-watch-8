import { memo } from 'react';
import FilmCard from '../film-card/film-card';
import type { FilmListProps } from './type';

function FilmList({films}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
        />
      ))}
    </div>
  );
}

export default memo(FilmList);
