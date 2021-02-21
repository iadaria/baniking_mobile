import { IProfile, Role } from '~/src/app/models/profile';
import * as constants from './cabinetConstants';

export interface IProfileState {
  loading: boolean;
  errors: string[];
  language?: string;
  currentUser: IProfile;
}

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
    full_name: null,
    // editions,
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
