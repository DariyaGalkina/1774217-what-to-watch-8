import {
  connect,
  ConnectedProps
} from 'react-redux';
import {
  Link,
  useParams
} from 'react-router-dom';
import AddReviewForm from '../add-review-form/add-review-form';
import Loading from '../../../loading/loading';
import UserBlock from '../../../user-block/user-block';
import { fetchFilmAction } from '../../../../store/api-actions';
import { AppRoute } from '../../../../const';
import type { State } from '../../../../types/state';
import type { ThunkAppDispatch } from '../../../../types/action';

const mapStateToProps = ({currentFilm}: State) => ({
  currentFilm,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getCurrentFilm(id: number) {
    dispatch(fetchFilmAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function AddReview({currentFilm, getCurrentFilm}: PropsFromRedux): JSX.Element {
  const {id}: {id: string} = useParams();
  const filmId = Number(id);

  if (currentFilm.id !== filmId) {
    getCurrentFilm(filmId);

    return <Loading />;
  }

  const {
    name,
    posterImage,
    backgroundImage,
  } = currentFilm;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film.replace(':id', `${id}/#Overview`)} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={AppRoute.AddReview.replace(':id', id.toString())} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm />
    </section>
  );
}

export default connector(AddReview);
