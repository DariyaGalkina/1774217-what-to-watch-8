import {
  connect,
  ConnectedProps
} from 'react-redux';
import { Dispatch } from 'redux';
import {
  changeGenre,
  filterFilms
} from '../../../store/action';
import { Genres } from '../../../const';
import type { Actions } from '../../../types/action';
import type { FilmProps } from '../../../types/film';
import type { State } from '../../../types/state';
import type { GenreListProps } from './type';

const mapStateToProps = ({currentGenre}: State) => ({
  currentGenre,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: string) {
    dispatch(changeGenre(genre));
  },
  onFilterFilms(films: FilmProps[]) {
    dispatch(filterFilms(films));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedGenreListProps = PropsFromRedux & GenreListProps;

export function GenreList({films, currentGenre, onChangeGenre, onFilterFilms}: ConnectedGenreListProps): JSX.Element {
  const genres = [
    Genres.All,
    ...new Set(films.map((film) => film.genre)),
  ];

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}
        >
          <a
            href="/"
            className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              onChangeGenre(genre);
              onFilterFilms(films);
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default connector(GenreList);
