import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import MyList from './my-list';
import { makeFakeFilmList } from '../../../mocks/film-data';
import { AuthorizationStatus } from '../../../const';

const FILM_COUNT = 5;
const fakeFilms = makeFakeFilmList(FILM_COUNT);

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    authorizationStatus: AuthorizationStatus.Auth,
    favoriteFilms: fakeFilms,
  },
});

describe('Component: MyList', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should do fetchFavoriteFilms action when rendered', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    expect(dispatch).not.toBeCalled();

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyList />
        </Router>
      </Provider>,
    );

    expect(dispatch).toBeCalled();
  });
});
