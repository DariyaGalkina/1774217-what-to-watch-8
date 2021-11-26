import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import {
  Route,
  Router
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../../../mocks/film-data';
import AddReview from './add-review';
import {
  AppRoute,
  AuthorizationStatus
} from '../../../../const';

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

describe('Component: AddReview', () => {
  it('should render correctly', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <AddReview />,
        </Router>
      </Provider>,
    );

    expect(container.firstChild).toHaveClass('film-card film-card--full');
    expect(screen.getByAltText(`${fakeFilm.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when logo clicked', () => {
    history.push(AppRoute.AddReview.replace('id', String(fakeFilm.id)));

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.Main} exact>
            <h1>This is Main page</h1>
          </Route>
          <Route>
            <AddReview />
          </Route>,
        </Router>,
      </Provider>,
    );

    const link = screen.getAllByRole('link')[0] as HTMLAnchorElement;

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.queryByText(/This is Main page/i)).toBeInTheDocument();
  });

  it('should redirect to "Film" when link clicked', () => {
    history.push(AppRoute.AddReview.replace('id', String(fakeFilm.id)));

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.Film.replace('id', String(fakeFilm.id))} exact>
            <h1>This is Film page</h1>
          </Route>
          <Route>
            <AddReview />
          </Route>,
        </Router>,
      </Provider>,
    );

    const link = screen.getAllByRole('link')[1] as HTMLAnchorElement;

    expect(screen.queryByText(/This is Film page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.queryByText(/This is Film page/i)).toBeInTheDocument();
  });
});
