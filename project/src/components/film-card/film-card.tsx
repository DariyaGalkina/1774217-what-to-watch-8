import {
  memo,
  useState
} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FilmCardPlayer from '../film-card-player/film-card-player';
import { AppRoute } from '../../const';
import type { FilmCardProps } from './type';

function FilmCard({film}: FilmCardProps): JSX.Element {
  const {
    id,
    name,
    previewImage,
    previewVideoLink,
  } = film;

  const [isPlayed, setIsPlayed] = useState(false);
  const history = useHistory();

  const filmRoute = AppRoute.Film.replace(':id', `${id}/#Overview`);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPlayed(true)}
      onMouseLeave={() => setIsPlayed(false)}
      onClick={() => history.push(filmRoute)}
    >
      <div className="small-film-card__image">
        <FilmCardPlayer
          src={previewVideoLink}
          poster={previewImage}
          isPlayed={isPlayed}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={filmRoute}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
