import { ICabinet, IProfile } from '~/src/app/models/profile';
import * as constants from './profileConstants';

export interface IProfileState {
  loading: boolean;
  errors: string[];
  cabinetErrors: string[];
  language?: string;
  currentUserProfile: IProfile | null;
  currentUserCabinet: ICabinet | null;
  selectedUserProfile: IProfile | null;
  selectedUserCabinet: ICabinet | null;
}

const initialState: IProfileState = {
  loading: false,
  errors: [],
  cabinetErrors: [],
  currentUserProfile: null,
  currentUserCabinet: null,
  selectedUserProfile: null,
  selectedUserCabinet: null,
};

export default function persistReducer(
  state: IProfileState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IProfileState {
  switch (type) {
    case constants.GET_PROFILE_SETTINGS:
      return {
        ...state,
        loading: true,
        errors: [],
      };
    // Profile
    case constants.SET_PROFILE_SETTINGS:
      return {
        ...state,
        loading: false,
        currentUserProfile: payload,
      };

    case constants.SEND_PROFILE_DATA:
      return {
        ...state,
        loading: true,
        currentUserProfile: payload,
      };

    case constants.GET_PROFILE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    // Cabinet
    case constants.GET_CABINET_DATA:
      return {
        ...state,
        loading: true,
        cabinetErrors: [],
        currentUserProfile: payload,
      };

    case constants.SET_CABINET_DATA:
      return {
        ...state,
        loading: false,
        cabinetErrors: [],
        currentUserProfile: payload,
      };

    // Common
    case constants.CLEAR_PROFILE:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
}
