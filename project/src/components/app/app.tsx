import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import AddReview from '../add-review/add-review';
import Film from '../film/film';
import MainPage from '../main-page/main-page';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import type { AppProps } from './type';

export default function App({filmInfo}: AppProps): JSX.Element {
  const {
    name,
    genre,
    release,
  } = filmInfo;

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage
            filmName={name}
            filmGenre={genre}
            filmRelease={release}
          />
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route path={AppRoute.Film} exact>
          <Film />
        </Route>
        <Route path={AppRoute.AddReview} exact>
          <AddReview />
        </Route>
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
