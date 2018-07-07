import {
  LOGIN,
  REGISTER,
  LOGOUT,
  LOGIN_ERROR,
  GOOGLE_LOGIN,
  UPLOAD_PROFILE_IMAGE,
  USER_SETTINGS_UPDATE,
  HYDRATE_USER
} from '../actions/actionTypes';
import { User } from '../types/User';
import { UserState, UserAction } from '../types/Redux';

function userReducer(state: UserState = {}, action: UserAction): UserState {
  switch (action.type) {
    case HYDRATE_USER:
      return action.data as User;
    case LOGIN:
      return action.data as User;
    case LOGIN_ERROR:
      return action.error as any;
    case REGISTER:
      return action.data as User;
    case USER_SETTINGS_UPDATE:
      return action.data as User;
    case LOGOUT:
      return {};
    case GOOGLE_LOGIN:
      return action.data as User;
    case UPLOAD_PROFILE_IMAGE:
      return action.data as User;
    default:
      return state;
  }
}

export default userReducer;
