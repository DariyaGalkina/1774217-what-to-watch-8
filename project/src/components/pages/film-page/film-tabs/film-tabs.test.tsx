import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import FilmTabs from './film-tabs';
import { makeFakeFilm } from '../../../../mocks/film-data';

const TIME_OUT = 1000;

const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

describe('Component: FilmTabs', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <FilmTabs
          id={fakeFilm.id}
          film={fakeFilm}
        />
      </Router>,
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    setTimeout(() => {
      expect(screen.getByText(/Overview/i)).toHaveClass('film-nav__item--active');
    }, TIME_OUT);
  });

  it('should change active tab when link clicked', () => {
    render(
      <Router history={history}>
        <FilmTabs
          id={fakeFilm.id}
          film={fakeFilm}
        />
      </Router>,
    );

    setTimeout(() => {
      screen.getAllByRole('listitem').forEach((el) => {
        userEvent.click(el);
        expect(el).toHaveClass('film-nav__item--active');
      });
    }, TIME_OUT);
  });
});
