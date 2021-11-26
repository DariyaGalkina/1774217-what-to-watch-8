import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import ReactRouter from 'react-router';
import {
  Route,
  Router
} from 'react-router-dom';
import Film from './film';
import { makeFakeFilm } from '../../../../mocks/film-data';
import {
  AppRoute,
  AuthorizationStatus
} from '../../../../const';

const fakeFilm = makeFakeFilm();
const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Film', () => {
  it('should render correctly when user authorized', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      film: {
        currentFilm: fakeFilm,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Film />,
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render correctly when user unauthorized', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      film: {
        currentFilm: fakeFilm,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Film />,
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
  });

  it('should redirect to "Player" when button clicked', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      film: {
        currentFilm: fakeFilm,
      },
    });

    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.Player.replace('id', String(fakeFilm.id))}>
            <h1>This is Player page</h1>
          </Route>
          <Route>
            <Film />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is Player page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Play/i));
    expect(screen.getByText(/This is Player page/i)).toBeInTheDocument();
  });

  it('should redirect to "AddReview" when button clicked', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      film: {
        currentFilm: fakeFilm,
      },
    });

    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.AddReview.replace('id', String(fakeFilm.id))}>
            <h1>This is AddReview page</h1>
          </Route>
          <Route>
            <Film />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is AddReview page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Add review/i));
    expect(screen.getByText(/This is AddReview page/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when logo clicked', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilm.id) });

    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      film: {
        currentFilm: fakeFilm,
      },
    });

    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.Main} exact>
            <h1>This is Main page</h1>
          </Route>
          <Route>
            <Film />
          </Route>,
        </Router>,
      </Provider>,
    );

    const link = screen.getAllByRole('link')[0] as HTMLAnchorElement;

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.queryByText(/This is Main page/i)).toBeInTheDocument();
  });
});
