import {
  connect,
  ConnectedProps
} from 'react-redux';
import FilmList from '../film-list/film-list';
import type { State } from '../../types/state';

const MAX_SIMILAR_FILMS = 4;

const mapStateToProps = ({currentFilm, similarFilms}: State) => ({
  currentFilmId: currentFilm?.id,
  similarFilms,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function SimilarFilms({currentFilmId, similarFilms}: PropsFromRedux): JSX.Element {
  return (
    <div>
      {
        similarFilms.length > 0 && (
          <>
            <h2 className="catalog__title">More like this</h2>
            <FilmList films={similarFilms
              .filter((film) => film.id !== currentFilmId)
              .slice(0, MAX_SIMILAR_FILMS)}
            />
          </>
        )
      }
    </div>
  );
}

export default connector(SimilarFilms);
