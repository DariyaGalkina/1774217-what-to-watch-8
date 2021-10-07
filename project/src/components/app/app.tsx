import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import type { AppProps } from './type';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';


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
        <Route path={AppRoute.MyList} exact>
          <MyList />
        </Route>
        <Route path={AppRoute.Film} exact>
          <Film />
        </Route>
        <Route path={AppRoute.AddReview} exact>
          <AddReview />
        </Route>
        <Route path={AppRoute.Player} exact>
          <Player />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
