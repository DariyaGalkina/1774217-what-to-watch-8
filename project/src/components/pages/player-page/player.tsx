import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentFilm } from '../../../store/current-film/selectors';
import { fetchFilmAction } from '../../../store/api-actions';
import Loading from '../../loading/loading';
import { AppRoute } from '../../../const';
import { Link } from 'react-router-dom';

const HOUR = 60;

export default function Player(): JSX.Element {
  const currentFilm = useSelector(getCurrentFilm);
  const dispatch = useDispatch();
  const {id}: {id: string} = useParams();
  const filmId = Number(id);

  const getFilm = (currentFilmId: number) => {
    dispatch(fetchFilmAction(currentFilmId));
  };

  useEffect(() => {
    if (currentFilm.id !== filmId) {
      getFilm(filmId);
    }
  });

  if (currentFilm.id !== filmId) {
    return <Loading />;
  }

  const {
    name,
    posterImage,
    videoLink,
    runTime,
  } = currentFilm;

  const playerRunTime = `${Math.floor(runTime / HOUR)}:${runTime % HOUR}:00`;

  return (
    <div className="player">
      <video src={videoLink} className="player__video" poster={posterImage}></video>

      <Link to={AppRoute.Film.replace(':id', `${id}/#Overview`)}>
        <button type="button" className="player__exit">Exit</button>
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{playerRunTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
