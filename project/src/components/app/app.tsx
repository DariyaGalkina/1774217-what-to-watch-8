import {
  Router as BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import AddReview from '../pages/add-review-page/add-review/add-review';
import Film from '../pages/film-page/film/film';
import Loading from '../loading/loading';
import Main from '../pages/main-page/main/main';
import MyList from '../pages/my-list-page/my-list';
import NotFound from '../not-found/not-found';
import Player from '../pages/player-page/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../pages/sign-in-page/sign-in';
import { browserHistory } from '../../browser-history';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import type { State } from '../../types/state';

const mapStateToProps = ({filmList, isDataLoaded, authorizationStatus}: State) => ({
  films: filmList,
  isDataLoaded,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function App({films, isDataLoaded, authorizationStatus}: PropsFromRedux): JSX.Element {
  if (authorizationStatus === AuthorizationStatus.Unknown || !isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main films={films} />
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList}>
          <MyList films={films} />
        </PrivateRoute>
        <Route path={AppRoute.Film} exact>
          <Film />
        </Route>
        <PrivateRoute exact path={AppRoute.AddReview}>
          <AddReview />
        </PrivateRoute>
        <Route path={AppRoute.Player} exact>
          <Player films={films} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
