import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SimilarFilms from './similar-films';
import {
  makeFakeFilm,
  makeFakeFilmList
} from '../../../../mocks/film-data';

const FILM_COUNT = 10;

const fakeFilm = makeFakeFilm();
const fakeFilmList = makeFakeFilmList(FILM_COUNT);
const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: SimilarFilms', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly when data is not loaded', () => {
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      film: {
        currentFilm: fakeFilm,
        similarFilms: fakeFilmList,
        isSimilarFilmsLoaded: false,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <SimilarFilms />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly when data is loaded', () => {
    const store = mockStore({
      film: {
        currentFilm: fakeFilm,
        similarFilms: fakeFilmList,
        isSimilarFilmsLoaded: true,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <SimilarFilms />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });
});
