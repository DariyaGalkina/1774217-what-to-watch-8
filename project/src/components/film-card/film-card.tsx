import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import type { FilmCardProps } from './type';

export default function FilmCard({id, filmName, preview, onMouseEnter}: FilmCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter(id);
  };

  const handleMouseLeave = () => {
    onMouseEnter(null);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="small-film-card__image">
        <img src={preview} alt={filmName} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film.replace(':id', `${id}`)}>{filmName}</Link>
      </h3>
    </article>
  );
}
