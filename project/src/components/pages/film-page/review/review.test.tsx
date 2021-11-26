import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import Review from './review';
import { makeFakeReviewList } from '../../../../mocks/review-data';

const REVIEW_COUNT = 5;

const fakeReviews = makeFakeReviewList(REVIEW_COUNT);
const history = createMemoryHistory();

describe('Component: Review', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Router history={history}>
        <Review reviews={fakeReviews} />
      </Router>,
    );

    expect(container.firstChild).toHaveClass('film-card__reviews-col');
  });
});
