import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import AddReview from '../add-review-page/add-review/add-review';
import Film from '../film-page/film/film';
import Loading from '../loading/loading';
import Main from '../main-page/main/main';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
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
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main films={films} />
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList films={films} />}
        >
        </PrivateRoute>
        <Route path={AppRoute.Film} exact>
          <Film />
        </Route>
        <Route path={AppRoute.AddReview} exact>
          <AddReview films={films} />
        </Route>
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
