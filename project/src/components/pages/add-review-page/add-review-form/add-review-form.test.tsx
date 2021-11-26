import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AddReviewForm from './add-review-form';
import { makeFakeFilm } from '../../../../mocks/film-data';
import { AuthorizationStatus } from '../../../../const';

const RATING_VALUE = 10;
const fakeFilm = makeFakeFilm();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  film: {
    currentFilm: fakeFilm,
  },
});

describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <AddReviewForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('button should become active when input is correct', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <AddReviewForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Post')).toBeDisabled();

    userEvent.click(screen.getByDisplayValue(RATING_VALUE));
    userEvent.type(screen.getByPlaceholderText('Review text'),
      `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Itaque, id? Expedita vitae ratione delectus nesciunt similique
      magni optio autem id quidem consequatur nemo, tempora beatae
      fuga est molestiae minus at ipsa iste obcaecati saepe. Rerum
      repudiandae, aliquam possimus quae nam, eos hic fugiat, amet
      voluptas suscipit voluptates soluta cumque nisi.`);

    expect(screen.getByText('Post')).not.toBeDisabled();
  });

  it('should do sendReview action when link clicked', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <AddReviewForm />
        </Router>,
      </Provider>,
    );

    userEvent.click(screen.getByDisplayValue(RATING_VALUE));
    userEvent.type(screen.getByPlaceholderText('Review text'),
      `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Itaque, id? Expedita vitae ratione delectus nesciunt similique
      magni optio autem id quidem consequatur nemo, tempora beatae
      fuga est molestiae minus at ipsa iste obcaecati saepe. Rerum
      repudiandae, aliquam possimus quae nam, eos hic fugiat, amet
      voluptas suscipit voluptates soluta cumque nisi.`);
    userEvent.click(screen.getByText('Post'));

    expect(dispatch).toBeCalled();
  });
});
