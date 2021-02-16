import { ISocialAccount, Role } from '~/src/app/models/user';
import * as constants from './persistConstants';

// TOOD SET USER PROVIDER DATE

/* export interface IAction {
  type: string;
  payload: IPersistState;
} */

interface IUser {
  email?: string;
  name: string;
  phone?: string;
  token: string;
  userId: string;
  avatar: string;
  verified: boolean;
  role: Role;
  accounts: ISocialAccount[];
  // contact?:
  // contactsAllowed: boolean;
}

export interface IPersistState {
  language?: string;
  currentUser: Partial<IUser>;
}

const initialState: IPersistState = {
  currentUser: {
    email: '',
    name: '',
    phone: '',
    token: '',
    userId: '',
    avatar: '',
    verified: false,
    role: Role.User,
    accounts: [],
  },
};

export default function persistReducer(
  state: IPersistState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IPersistState {
  switch (type) {
    case constants.SET_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    case constants.SET_USER_TOKEN:
      return {
        ...state,
        currentUser: {
          token: payload,
        },
      };
    case constants.SET_USER_EMAIL:
      return {
        ...state,
        currentUser: {
          email: payload.email,
        },
      };
    case constants.SET_USER_DATA:
      return {
        ...state,
        currentUser: {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          avatar: payload.avatar,
          role: payload.role,
        },
      };
    default:
      return state;
  }
}
