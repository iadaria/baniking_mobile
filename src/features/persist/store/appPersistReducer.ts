import { IPersistUser } from '~/src/app/models/user';
import * as constants from './appPersistConstants';
import { refreshAccounts } from '../../../app/utils/auth';

// TOOD SET USER PROVIDER DATE

export interface IPersistState {
  language: string | null;
  token: string | null;
  currentUser: Partial<IPersistUser> | null;
}

const initialState: IPersistState = {
  language: null,
  token: null,
  currentUser: null,
};

export default function appPersistReducer(
  state: IPersistState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IPersistState {
  switch (type) {
    case constants.SET_LANGUAGE:
      return {
        ...state,
        language: payload,
      };

    case constants.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };

    case constants.SET_USER_EMAIL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          email: payload,
        },
      };
    case constants.SET_USER_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
      };
    // Social provider
    case constants.ADD_SOCIAL_ACCOUNT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          accounts: refreshAccounts(state.currentUser?.accounts, payload),
        },
      };
    // Common
    case constants.ASK_LOGOUT:
      return {
        ...state,
      };

    case constants.LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
