import { useState } from 'react';
import { Link } from 'react-router-dom';
import FilmCardPlayer from '../film-card-player/film-card-player';
import { AppRoute } from '../../const';
import type { FilmCardProps } from './type';

const VIDEO_DELAY = 1000;

export default function FilmCard({id, filmName, preview, previewVideoLink}: FilmCardProps): JSX.Element {
  const [isPlayed, setIsPlayed] = useState(false);
  let mouseOnCard = false;

  const handleMouseEnter = () => {
    mouseOnCard = true;
    setTimeout(() => {
      if (mouseOnCard) {
        setIsPlayed(true);
      }
    }, VIDEO_DELAY);
  };

  const handleMouseLeave = () => {
    setIsPlayed(false);
    mouseOnCard = false;
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="small-film-card__image">
        <FilmCardPlayer
          src={previewVideoLink}
          poster={preview}
          isPlayed={isPlayed}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film.replace(':id', `${id}`)}>{filmName}</Link>
      </h3>
    </article>
  );
}
