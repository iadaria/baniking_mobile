import { IPersistUser } from '~/src/app/models/user';
import * as constants from './appPersistConstants';
import { refreshAccounts } from '../../../app/utils/auth';
import { IPersistImages } from '~/src/app/models/persist';
import { Bath } from '~/src/app/models/bath';

// TOOD SET USER PROVIDER DATE

export interface IPersistState {
  language: string | null;
  token: string | null;
  currentUser: Partial<IPersistUser> | null;
  image: IPersistImages;
  bathes: Bath[];
  // City
  selectedCityName: string | null;
}

const initialState: IPersistState = {
  language: null,
  token: null,
  currentUser: null,
  image: {
    images: [],
    set: [],
  },
  bathes: [],
  // city
  selectedCityName: null,
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

    // Images
    case constants.PERSIST_IMAGE:
      const { images, set } = state.image as IPersistImages;
      const has = [...set].includes(payload.id);
      return {
        ...state,
        image: {
          images: has ? [...images] : [...images, payload],
          set: has ? [...set] : [...set, payload.id],
        },
      };

    // Cities
    case constants.SELECT_CITY:
      return {
        ...state,
        selectedCityName: payload,
      };

    // Common
    case constants.ASK_LOGOUT:
      return {
        ...initialState,
        image: state.image,
        bathes: state.bathes,
      };

    default:
      return state;
  }
}
