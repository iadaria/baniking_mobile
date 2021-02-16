import { ISocialAccount } from '~/src/app/models/user';
import * as constants from './profileConstants';

interface IProfile {
  email: string;
  name: string | null;
  surname: string | null;
  middle_name: string | null;
  phone: string;
  birth_date: Date | null;
  avatar: string;
  full_name: string | null;
  role: 'user' | 'manager';
  // editional
  accounts: ISocialAccount[];
  userId: string | null;
  // contact?:
  // contactsAllowed: boolean;
}

export interface IProfileState {
  language?: string;
  currentUser: IProfile;
}

const initialState: IProfileState = {
  currentUser: {
    email: '',
    name: null,
    surname: null,
    middle_name: null,
    phone: '',
    birth_date: null,
    userId: null,
    avatar: '',
    full_name: null,
    // editions
    role: 'user',
    accounts: [],
  },
};

export default function persistReducer(
  state: IProfileState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IProfileState {
  switch (type) {
    case constants.GET_PROFILE_DATA:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      return state;
  }
}
