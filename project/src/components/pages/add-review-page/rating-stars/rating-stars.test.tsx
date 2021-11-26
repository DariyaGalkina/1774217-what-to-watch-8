import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RatingStars from './rating-stars';
import { makeFakeFilm } from '../../../../mocks/film-data';
import { AuthorizationStatus } from '../../../../const';

const fakeFilm = makeFakeFilm();
const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  auth: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  film: {
    currentFilm: fakeFilm,
  },
});

describe('Component: RatingStars', () => {
  it('should render correctly', () => {
    const isDisabled = true;

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <RatingStars
            onChange={jest.fn()}
            isDisabled={isDisabled}
          />,
        </Router>
      </Provider>,
    );

    expect(container.firstChild).toHaveClass('rating__stars');

    for (let index = 1; index < 11; index++) {
      expect(screen.getByDisplayValue(index)).toBeInTheDocument();
    }
  });

  it('should become checked when user click radio', () => {
    const isDisabled = false;

    render(
      <Provider store={store}>
        <Router history={history}>
          <RatingStars
            onChange={jest.fn()}
            isDisabled={isDisabled}
          />,
        </Router>
      </Provider>,
    );

    for (let index = 1; index < 11; index++) {
      userEvent.click(screen.getByDisplayValue(index));
      expect(screen.getByDisplayValue(index)).toBeChecked();
    }
  });
});
