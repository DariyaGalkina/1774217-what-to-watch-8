import type { FilmTabDetailsProps } from './type';

const HOUR = 60;

export default function FilmTabDetails({film}: FilmTabDetailsProps) : JSX.Element {
  const {
    director,
    starring,
    runTime,
    genre,
    released,
  } = film;

  const formatRunTime = (minutes: number) => (
    minutes > HOUR ? `${Math.floor(minutes / HOUR)}h ${minutes % HOUR}m`: `${minutes}m`
  );

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span style={{ whiteSpace: 'pre-line' }} className="film-card__details-value">
            {starring.join(', \n')}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatRunTime(runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}
