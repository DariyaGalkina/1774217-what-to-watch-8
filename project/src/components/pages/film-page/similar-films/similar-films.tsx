import { useEffect } from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import FilmList from '../../../film-list/film-list';
import Loading from '../../../loading/loading';
import { fetchSimilarFilmsAction } from '../../../../store/api-actions';
import type { ThunkAppDispatch } from '../../../../types/action';
import type { State } from '../../../../types/state';

const MAX_SIMILAR_FILMS = 4;

const mapStateToProps = ({currentFilm, similarFilms, isSimilarFilmsLoaded}: State) => ({
  currentFilmId: currentFilm.id,
  similarFilms,
  isSimilarFilmsLoaded,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getSimilarFilms(id: number) {
    dispatch(fetchSimilarFilmsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function SimilarFilms({
  currentFilmId,
  similarFilms,
  isSimilarFilmsLoaded,
  getSimilarFilms,
}: PropsFromRedux): JSX.Element {

  useEffect(() => {
    if (!isSimilarFilmsLoaded) {
      getSimilarFilms(currentFilmId);
    }
  });

  if (!isSimilarFilmsLoaded) {
    return (
      <Loading />
    );
  }

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
