import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = ({auth}: State): AuthorizationStatus => auth.authorizationStatus;
