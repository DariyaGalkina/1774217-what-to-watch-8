import { Link } from 'react-router-dom';
import FilmList from '../../film-list/film-list';
import Footer from '../../footer/footer';
import UserBlock from '../../user-block/user-block';
import { AppRoute } from '../../../const';
import type { MyListProps } from './type';

export default function MyList({films}: MyListProps): JSX.Element {
  const favoriteFilms = films.filter((film) => film.isFavorite);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList films={favoriteFilms} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
