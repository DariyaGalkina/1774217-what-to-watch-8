import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/selectors';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

export default function UserBlock(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const setLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth ?
          (
            <>
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <Link to={AppRoute.MyList}>
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                  </Link>
                </div>
              </li>
              <li className="user-block__item">
                <Link onClick={setLogout} className="user-block__link" to={AppRoute.Main}>Sign Out</Link>
              </li>
            </>
          ) : (
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.SignIn}>Sign In</Link>
            </li>
          )
      }
    </ul>
  );
}
