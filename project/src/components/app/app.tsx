import {
  Router as BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddReview from '../pages/add-review-page/add-review/add-review';
import Film from '../pages/film-page/film/film';
import Loading from '../loading/loading';
import Main from '../pages/main-page/main/main';
import MyList from '../pages/my-list-page/my-list';
import NotFound from '../not-found/not-found';
import Player from '../pages/player-page/player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../pages/sign-in-page/sign-in';
import { browserHistory } from '../../browser-history';
import { getAuthorizationStatus } from '../../store/auth/selectors';
import {
  getFilmList,
  getIsDataLoaded
} from '../../store/film-list/selectors';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

export default function App(): JSX.Element {
  const films = useSelector(getFilmList);
  const isDataLoaded = useSelector(getIsDataLoaded);
  const authorizationStatus = useSelector(getAuthorizationStatus);

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
          <MyList />
        </PrivateRoute>
        <Route path={AppRoute.Film} exact>
          <Film />
        </Route>
        <PrivateRoute exact path={AppRoute.AddReview}>
          <AddReview />
        </PrivateRoute>
        <Route path={AppRoute.Player} exact>
          <Player />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
