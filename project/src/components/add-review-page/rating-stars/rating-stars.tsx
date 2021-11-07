import { Fragment } from 'react';
import { RatingStarsProps } from './type';

const MAX_RATING = 10;

export default function RatingStars({onChange, isDisabled}: RatingStarsProps): JSX.Element {
  return (
    <div className="rating__stars">
      {
        new Array(10).fill(null).map((_, index) => {
          const ratingValue = MAX_RATING - index;

          return (
            <Fragment key={ratingValue}>
              <input
                className="rating__input"
                id={`star-${ratingValue}`}
                type="radio"
                name="rating"
                value={`${ratingValue}`}
                disabled={isDisabled}
                onChange={onChange}
              />
              <label
                className="rating__label"
                htmlFor={`star-${ratingValue}`}
              >
                Rating {ratingValue}
              </label>
            </Fragment>
          );
        })
      }
    </div>
  );
}
