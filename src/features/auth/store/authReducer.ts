import * as constants from './authConstants';
import { IUserAuth, Role } from '~/src/app/models/user';

/* interface IAction {
  type: string;
  payload: IUser;
  errors?: string[];
} */

export interface IAuthState {
  authenticated: boolean;
  role: Role;
  currentUser: IUserAuth | null;
  loading: boolean;
  errors?: string[] | null;
}

const initialState: IAuthState = {
  authenticated: false,
  role: Role.User,
  currentUser: null,
  loading: false,
  errors: null,
};

export default function authReducer(
  state: IAuthState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IAuthState {
  switch (type) {
    case constants.LOG_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: true,
        errors: null,
      };
    case constants.EMAIL_LOGIN:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case constants.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case constants.RECOVERY_PASSWORD:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case constants.SOCIAL_LOGIN:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case constants.LOG_IN_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case constants.SET_USER_DATA:
      return {
        ...state,
        authenticated: true,
        currentUser: payload,
        loading: false,
        errors: null,
      };
    case constants.LOG_OUT:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
}
