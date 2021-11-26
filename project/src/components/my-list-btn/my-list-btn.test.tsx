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
import MyListButton from './my-list-btn';
import { makeFakeFilm } from '../../mocks/film-data';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

describe('Component: MyListButton', () => {
  beforeEach(() => {
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());
  });

  it('should render correctly', () => {
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth || AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton film={fakeFilm} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render when user unauthorized', () => {
    const film = {
      ...fakeFilm,
      isFavorite: false,
    };
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton film={film} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/add/i)).toBeInTheDocument();
  });

  it('should render when user authorized and film is favorite', () => {
    const film = {
      ...fakeFilm,
      isFavorite: true,
    };
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton film={film} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/in-list/i)).toBeInTheDocument();
  });

  it('should render when user authorized and film is not favorite', () => {
    const film = {
      ...fakeFilm,
      isFavorite: false,
    };
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton film={film} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/add/i)).toBeInTheDocument();
  });

  it('should do setFavorite action when button clicked', () => {
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth || AuthorizationStatus.NoAuth,
      },
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton film={fakeFilm} />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/My list/i));
    expect(dispatch).toBeCalled();
  });
});
