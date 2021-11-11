import { useEffect } from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import Loading from '../../../loading/loading';
import Review from '../review/review';
import { fetchReviewsAction } from '../../../../store/api-actions';
import type { State } from '../../../../types/state';
import type { ThunkAppDispatch } from '../../../../types/action';

const mapStateToProps = ({reviews, currentFilm, isReviewsLoaded}: State) => ({
  currentFilmId: currentFilm.id,
  reviews,
  isReviewsLoaded,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getReviews(id: number) {
    dispatch(fetchReviewsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function FilmTabReviews({
  currentFilmId,
  reviews,
  isReviewsLoaded,
  getReviews,
} : PropsFromRedux) : JSX.Element {

  useEffect(() => {
    if (!isReviewsLoaded) {
      getReviews(currentFilmId);
    }
  });

  if (!isReviewsLoaded) {
    return <Loading />;
  }

  const midIndex = Math.round(reviews.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      {<Review reviews={reviews.slice(0, midIndex)} />}
      {<Review reviews={reviews.slice(midIndex)} />}
    </div>
  );
}

export default connector(FilmTabReviews);
