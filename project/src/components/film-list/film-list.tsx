import FilmCard from '../film-card/film-card';
import type { FilmListProps } from './type';

export default function FilmList({films}: FilmListProps): JSX.Element {
  return (
    <>
      {films.map((film) => (
        <FilmCard
          key={film.id}
          filmName={film.name}
          preview={film.previewImage}
        />
      ))}
    </>
  );
}
