import {
  connect,
  ConnectedProps
} from 'react-redux';
import {
  useHistory,
  useParams
} from 'react-router';
import { Link } from 'react-router-dom';
import FilmTabs from '../film-tabs/film-tabs';
import Loading from '../../loading/loading';
import SimilarFilms from '../../similar-films/similar-films';
import { fetchFilmAction, fetchSimilarFilmsAction } from '../../../store/api-actions';
import { AppRoute } from '../../../const';
import type { FilmOverviewProps } from './type';
import type { FilmProps } from '../../../types/film';
import type { State } from '../../../types/state';
import type { ThunkAppDispatch } from '../../../types/action';

const mapStateToProps = ({currentFilm, similarFilms, isSimilarFilmsLoaded}: State) => ({
  currentFilm,
  similarFilms,
  isSimilarFilmsLoaded,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getCurrentFilm(id: number) {
    dispatch(fetchFilmAction(id));
  },
  getSimilarFilms(id: number) {
    dispatch(fetchSimilarFilmsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedFilmProps = PropsFromRedux & FilmOverviewProps;

export function Film({films, reviews, currentFilm, similarFilms, isSimilarFilmsLoaded, getCurrentFilm, getSimilarFilms}: ConnectedFilmProps): JSX.Element {
  const history = useHistory();
  const { id }: {id: string} = useParams();
  const filmId = Number(id);

  if (currentFilm?.id !== filmId) {
    getCurrentFilm(filmId);

    return (
      <Loading />
    );
  }

  if (!isSimilarFilmsLoaded) {
    getSimilarFilms(filmId);
  }

  const {
    name,
    backgroundImage,
    genre,
    released,
    posterImage,
  } = currentFilm as FilmProps;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a href="/" className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(AppRoute.Player.replace(':id', `${filmId}`))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link className="btn film-card__button" to={AppRoute.AddReview.replace(':id', `${filmId}`)}>Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <FilmTabs
              id={filmId}
              film={currentFilm as FilmProps}
              reviews={reviews}
            />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          {
            isSimilarFilmsLoaded ? (<SimilarFilms />) : (<Loading />)
          }
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default connector(Film);
