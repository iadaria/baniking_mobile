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
  sex: number;
  role: 'user' | 'manager';
  accounts: ISocialAccount[];
  userId: string | null;
  // contact?:
  // contactsAllowed: boolean;
}

export interface IProfileState {
  loading: boolean;
  errors: string[];
  language?: string;
  currentUser: IProfile;
}

/* "data": {
  "email": "jadarya@mail.ru",
  "name": "Daria",
  "surname": "Iakimova",
  "middle_name": "Andreevna",
  "phone": "+7(914)515-28-40",
  "birth_date": "23.03.1986",
  "sex": 0,
  "avatar": "https://baniking.ru/images/icons/user.png",
  "full_name": "Daria Iakimova"
} */

const initialState: IProfileState = {
  loading: false,
  errors: [],
  currentUser: {
    email: '',
    name: null,
    surname: null,
    middle_name: null,
    phone: '',
    birth_date: null,
    userId: null,
    avatar: '',
    sex: 0,
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
        loading: true,
        // currentUser: payload,
      };

    case constants.SEND_PROFILE_DATA:
      return {
        ...state,
        loading: false,
        currentUser: payload,
      };

    case constants.GET_PROFILE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    default:
      return state;
  }
}
