import { useState } from 'react';
import { Link } from 'react-router-dom';
import FilmCardPlayer from '../film-card-player/film-card-player';
import { AppRoute } from '../../const';
import type { FilmCardProps } from './type';

export default function FilmCard({id, filmName, preview, previewVideoLink}: FilmCardProps): JSX.Element {
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPlayed(true)}
      onMouseLeave={() => setIsPlayed(false)}
    >
      <div className="small-film-card__image">
        <FilmCardPlayer
          src={previewVideoLink}
          poster={preview}
          isPlayed={isPlayed}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film.replace(':id', `${id}/#Overview`)}>{filmName}</Link>
      </h3>
    </article>
  );
}
