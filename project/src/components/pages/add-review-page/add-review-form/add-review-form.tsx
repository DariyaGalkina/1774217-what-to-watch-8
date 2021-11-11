import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState
} from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import RatingStars from '../rating-stars/rating-stars';
import { sendReviewAction } from '../../../../store/api-actions';
import { ThunkAppDispatch } from '../../../../types/action';
import { ReviewPost } from '../../../../types/review';
import { State } from '../../../../types/state';

const DEFAULT_RATING = 0;
const MIN_POST_LENGTH = 50;
const MAX_POST_LENGTH = 400;

const mapStateToProps = ({currentFilm}: State) => ({
  filmId: currentFilm.id,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  sendReview(id: number, data: ReviewPost) {
    return dispatch(sendReviewAction(id, data));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function AddReviewForm({filmId, sendReview}: PropsFromRedux): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isRatingValid = rating > DEFAULT_RATING;
    const isTextAreaValid = userInput.length >= MIN_POST_LENGTH && userInput.length <= MAX_POST_LENGTH;

    setIsFormValid(isRatingValid && isTextAreaValid);
  }, [rating, userInput]);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(+evt.currentTarget.value);
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const postData = {
      rating: rating,
      comment: userInput,
    };

    setIsFormSending(true);
    sendReview(filmId, postData)
      .then(() => setIsFormSending(false));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <RatingStars
              onChange={handleRatingChange}
              isDisabled={isFormSending}
            />
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={userInput}
            disabled={isFormSending}
            onChange={(evt) => setUserInput(evt.currentTarget.value)}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isFormSending || !isFormValid}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default connector(AddReviewForm);
