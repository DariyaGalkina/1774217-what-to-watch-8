import type { ReviewProps } from '../../types/review';

export default function Review({reviews}: {reviews: ReviewProps[]}): JSX.Element {
  return (
    <div className="film-card__reviews-col">
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <blockquote className="review__quote">
            <p className="review__text">{review.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{review.user.name}</cite>
              <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
            </footer>
          </blockquote>

          <div className="review__rating">{review.rating}</div>
        </div>
      ))}
    </div>
  );
}
