import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  Route,
  Router
} from 'react-router';
import { createMemoryHistory } from 'history';
import Player from './player';
import { makeFakeFilm } from '../../../../mocks/film-data';
import { AppRoute } from '../../../../const';

const fakeFilm = makeFakeFilm();

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  film: {
    currentFilm: fakeFilm,
  },
});

const play = jest.fn();
const pause = jest.fn();
const fullScreen = jest.fn();

describe('Component: Player', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = play;
    window.HTMLMediaElement.prototype.pause = pause;
    window.HTMLMediaElement.prototype.requestFullscreen = fullScreen;
  });

  it('sould render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Player />
        </Router>
      </Provider>,
    );

    expect(container.firstChild).toHaveClass('player');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/play/i)).toBeInTheDocument();
    expect(screen.getByText(/exit/i)).toBeInTheDocument();
    expect(screen.getByText(/full screen/i)).toBeInTheDocument();
  });

  it('should play/pause video when button play/pause clicked', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Player />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/play/i)).toBeInTheDocument();
    expect(screen.queryByText(/pause/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/play/i));

    expect(screen.getByText(/pause/i)).toBeInTheDocument();
    expect(screen.queryByText(/play/i)).not.toBeInTheDocument();
    expect(play).toBeCalled();

    userEvent.click(screen.getByText(/pause/i));

    expect(screen.getByText(/play/i)).toBeInTheDocument();
    expect(screen.queryByText(/pause/i)).not.toBeInTheDocument();
    expect(pause).toBeCalled();
  });

  it('should go full screen when button clicked', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Player />
        </Router>
      </Provider>,
    );

    expect(fullScreen).not.toBeCalled();
    userEvent.click(screen.getByText(/full screen/i));
    expect(fullScreen).toBeCalled();
  });

  it('should go back in history when exit clicked', () => {
    history.push('/fake');
    history.push(AppRoute.Player.replace('id', fakeFilm.id.toString()));

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Player}>
            <Player />
          </Route>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/exit/i));

    expect(history.location.pathname).toBe('/fake');
  });
});
