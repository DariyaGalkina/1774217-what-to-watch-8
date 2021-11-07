import Review from '../../review/review';
import type { FilmTabReviewsProps } from './type';

export default function FilmTabReviews({reviews} : FilmTabReviewsProps) : JSX.Element {
  const midIndex = Math.round(reviews.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      {<Review reviews={reviews.slice(0, midIndex)} />}
      {<Review reviews={reviews.slice(midIndex)} />}
    </div>
  );
}
