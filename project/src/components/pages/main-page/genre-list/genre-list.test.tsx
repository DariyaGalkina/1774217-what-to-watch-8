import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import GenreList from './genre-list';
import { makeFakeFilmList } from '../../../../mocks/film-data';
import userEvent from '@testing-library/user-event';

const FILM_COUNT = 10;
const fakeFilms = makeFakeFilmList(FILM_COUNT);
const mockStore = configureMockStore();

describe('Component: GenreList', () => {
  it('should render correctly with active genre', () => {
    const uniqueGenres = new Set(fakeFilms.map((film) => film.genre));
    const activeGenre = fakeFilms[0].genre;
    const store = mockStore({
      filter: {
        currentGenre: activeGenre,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <GenreList
          films={fakeFilms}
          resetShowSize={jest.fn()}
        />
      </Provider>,
    );

    expect(container.firstChild).toHaveClass('catalog__genres-list');
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(Array.from(uniqueGenres).length + 1);
    expect(container.querySelector('.catalog__genres-item--active')).toHaveTextContent(activeGenre);
  });

  it('should reset "Show more" button', () => {
    const store = mockStore({
      films: {
        filmList: fakeFilms,
      },
      filter: {
        currentGenre: fakeFilms[0].genre,
      },
    });
    const fakeFunction = jest.fn();

    render(
      <Provider store={store}>
        <GenreList
          films={fakeFilms}
          resetShowSize={fakeFunction}
        />
      </Provider>,
    );

    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    expect(fakeFunction).toBeCalled();
  });

  it('should do changeGenre and filterFilms actions', () => {
    const store = mockStore({
      films: {
        filmList: fakeFilms,
      },
      filter: {
        currentGenre: fakeFilms[0].genre,
      },
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <GenreList
          films={fakeFilms}
          resetShowSize={jest.fn()}
        />
      </Provider>,
    );

    const links = screen.getAllByRole('link');

    userEvent.click(links[1]);
    expect(dispatch).toBeCalledTimes(2);
  });
});
