import {
  memo,
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useHistory } from 'react-router';
import { setFavoriteAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/auth/selectors';
import {
  AppRoute,
  AuthorizationStatus,
  FavoriteAction
} from '../../const';
import type { FilmProps } from '../../types/film';

function MyListButton({film}: {film: FilmProps}): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const [isInFavoriteList, setIsInFavoriteList] = useState(film.isFavorite);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => setIsInFavoriteList(film.isFavorite), [film, history]);

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(setFavoriteAction(film.id, isInFavoriteList ? FavoriteAction.Remove : FavoriteAction.Add));
      setIsInFavoriteList(!isInFavoriteList);
    } else {
      history.push(AppRoute.SignIn);
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isInFavoriteList ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
    </button>
  );
}

export default memo(MyListButton);
