import { useState } from 'react';
import FilmCard from '../film-card/film-card';
import type { FilmListProps } from './type';

export default function FilmList({films}: FilmListProps): JSX.Element {
  const [, setActiveCard] = useState<number | null>();

  function changeActiveCardById(id: number | null) {
    setActiveCard(id);
  }

  return (
    <>
      {films.map((film) => (
        <FilmCard
          key={film.id}
          id={film.id}
          filmName={film.name}
          preview={film.previewImage}
          onMouseEnter={changeActiveCardById}
        />
      ))}
    </>
  );
}
