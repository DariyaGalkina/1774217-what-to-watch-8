import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import FilmTabReviews from './film-tab-reviews';
import { makeFakeFilm } from '../../../../mocks/film-data';
import { makeFakeReviewList } from '../../../../mocks/review-data';

const REVIEW_COUNT = 5;

const fakeFilm = makeFakeFilm();
const fakeReviews = makeFakeReviewList(REVIEW_COUNT);

const history = createMemoryHistory();
const mockStore = configureMockStore();


describe('Component: FilmTabReviews', () => {
  it('should render correctly when data is not loaded', () => {
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      film: {
        currentFilm: fakeFilm,
        reviews: fakeReviews,
        isReviewsLoaded: false,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FilmTabReviews />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly when data is loaded', () => {
    const store = mockStore({
      film: {
        currentFilm: fakeFilm,
        reviews: fakeReviews,
        isReviewsLoaded: true,
      },
    });

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <FilmTabReviews />
        </Router>,
      </Provider>,
    );

    expect(container.firstChild).toHaveClass('film-card__reviews film-card__row');
  });
});
