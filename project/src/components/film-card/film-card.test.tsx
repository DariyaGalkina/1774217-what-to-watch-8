import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FilmCard from './film-card';
import { makeFakeFilm } from '../../mocks/film-data';
import { AppRoute } from '../../const';

const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

const mockStore = configureMockStore();
const store = mockStore();

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <FilmCard
            key={fakeFilm.id}
            film={fakeFilm}
          />
        </Router>,
      </Provider>,
    );

    expect(container.firstChild).toHaveClass('small-film-card catalog__films-card');
    expect(screen.getByText(`${fakeFilm.name}`)).toBeInTheDocument();
  });

  it('should redirect to "Film" when card clicked', () => {
    render(
      <Router history={history}>
        <Route path={AppRoute.Film.replace(':id', fakeFilm.id.toString())} exact>
          <h1>This is Fake Film page</h1>
        </Route>
        <Route>
          <FilmCard
            key={fakeFilm.id}
            film={fakeFilm}
          />
        </Route>,
      </Router>);

    expect(screen.queryByText(/This is Fake Film page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('article'));
    expect(screen.queryByText(/This is Fake Film page/i)).toBeInTheDocument();
  });
});
