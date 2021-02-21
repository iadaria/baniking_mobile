import { IPersistUser } from '~/src/app/models/user';
import * as constants from './appPersistConstants';

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

    case constants.ASK_LOGOUT:
      console.log('[persistReducer] ASK_LOGOUT');
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
