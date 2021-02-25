import { ICabinet, IProfile } from '~/src/app/models/profile';
import { initInputs } from '~/src/app/utils/validate';
import { defaultProfileInputs, IProfileInputs } from '../screens/contracts/profileInputs';
import * as constants from './profileConstants';

export interface IProfileState {
  loading: boolean;
  errors: {
    profile: [];
    avatar: [];
  };
  cabinetErrors: string[];
  language?: string;
  currentUserProfile: IProfile | null;
  currentUserCabinet: ICabinet | null;
  selectedUserProfile: IProfile | null;
  selectedUserCabinet: ICabinet | null;
  inputs: IInputs;
}

interface IInputs {
  settings: IProfileInputs;
}

const initialState: IProfileState = {
  loading: false,
  errors: {
    profile: [],
    avatar: [],
  },
  cabinetErrors: [],
  currentUserProfile: null,
  currentUserCabinet: null,
  selectedUserProfile: null,
  selectedUserCabinet: null,
  inputs: {
    settings: defaultProfileInputs,
  },
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
        errors: {
          ...state.errors,
          profile: [],
        },
      };
    // Profile
    case constants.SET_PROFILE_SETTINGS:
      return {
        ...state,
        loading: false,
        currentUserProfile: payload,
      };

    case constants.INIT_PROFILE_INPUTS:
      return {
        ...state,
        inputs: {
          settings: { ...initInputs(state.inputs.settings, payload) },
        },
      };

    case constants.SEND_PROFILE_SETTINGS:
      return {
        ...state,
        loading: true,
        currentUserProfile: payload,
      };

    case constants.PROFILE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case constants.SET_AVATAR:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          avatar: [],
        },
        currentUserProfile: {
          ...state.currentUserProfile!,
          avatar: payload,
        },
      };

    case constants.UPLOAD_AVATAR:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
          avatar: [],
        },
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
