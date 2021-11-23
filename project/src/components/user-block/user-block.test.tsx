import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import UserBlock from './user-block';
import { AppRoute, AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserBlock', () => {
  it('should render when user authorized', () => {
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlock />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  it('should render when user unauthorized', () => {
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlock />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('should do logout action when "Sign Out" clicked', () => {
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlock />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Sign Out/i));
    expect(dispatch).toBeCalled();
  });

  it('should redirect to "Mylist" when avatar clicked', () => {
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.MyList} >
              <h1>This is Mylist page</h1>
            </Route>
            <Route>
              <UserBlock />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is Mylist page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('img'));
    expect(screen.getByText(/This is Mylist page/i)).toBeInTheDocument();
  });

  it('should redirect to "SignIn" when "Sign In" clicked', () => {
    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.SignIn} >
              <h1>This is SignIn page</h1>
            </Route>
            <Route>
              <UserBlock />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is SignIn page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign In/i));
    expect(screen.getByText(/This is SignIn page/i)).toBeInTheDocument();
  });
});
