import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import {
  Route,
  Router
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Main from './main';
import {
  makeFakeFilm,
  makeFakeFilmList
} from '../../../../mocks/film-data';
import {
  AppRoute,
  AuthorizationStatus
} from '../../../../const';

const FILM_COUNT = 10;
const fakeFilm = makeFakeFilm();
const fakeFilms = makeFakeFilmList(FILM_COUNT);

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  films: {
    promo: fakeFilm,
    filmList: fakeFilms,
  },
  filter: {
    filteredFilms: fakeFilms,
  },
});

describe('Component: Main', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.film-card')).toBeInTheDocument();
    expect(container.querySelector('.page-content')).toBeInTheDocument();
    expect(screen.getByAltText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should redirect to "Player" when button clicked', () => {
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.Player.replace('id', String(fakeFilm.id))}>
            <h1>This is Player page</h1>
          </Route>
          <Route>
            <Main />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is Player page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Play/i));
    expect(screen.getByText(/This is Player page/i)).toBeInTheDocument();
  });
});
