import * as constants from './authConstants';
import { IUserAuth, Role } from '~/src/app/models/user';
import { IErrors } from '~/src/app/utils/error';

/* interface IAction {
  type: string;
  payload: IUser;
  errors?: string[];
} */

export interface IAuthState {
  authenticated: boolean;
  token: string | null;
  role: Role;
  currentUser: Partial<IUserAuth> | null;
  loading: boolean;
  errors: IErrors | null;
}

const initialState: IAuthState = {
  authenticated: false,
  token: null,
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

    case constants.EMAIL_REGISTER:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case constants.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    // Social login
    case constants.SOCIAL_LOGIN:
    case constants.GOOGLE_LOGIN:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case constants.SOCIAL_LOGIN_CANCELED:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    //
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
        currentUser: { ...state.currentUser, ...payload },
        loading: false,
        errors: null,
      };
    case constants.SET_TOKEN:
      return {
        ...state,
        authenticated: true,
        token: payload,
        loading: false,
        errors: null,
      };
    case constants.LOG_OUT:
      return {
        ...state,
        authenticated: false,
        token: null,
        currentUser: null,
        loading: false,
        errors: null,
      };

    // Common

    case constants.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case constants.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
}
