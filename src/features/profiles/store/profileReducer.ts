import { ICabinet, ILevel, IProfile, IQr, IResponseCabinet } from '~/src/app/models/profile';
import { initInputs } from '~/src/app/utils/validate';
import { defaultProfileInputs, IProfileInputs } from '../screens/contracts/profileInputs';
import * as constants from './profileConstants';
import { IErrors } from '~/src/app/utils/error';

export interface IProfileState {
  loading: boolean;
  errors: {
    profile: IErrors | null;
    avatar: IErrors | null;
  };
  language?: string;
  // Profile
  profileErrors: IErrors | null;
  currentUserProfile: IProfile | null;
  currentUserLevels: ILevel[];
  currentUserQr: IQr | null;
  selectedUserProfile: IProfile | null;
  // Cabinet
  cabinetErrors: IErrors | null;
  currentUserCabinet: ICabinet | null;
  selectedUserCabinet: ICabinet | null;
  // Others
  inputs: IInputs;
}

interface IInputs {
  settings: IProfileInputs;
}

const initialState: IProfileState = {
  loading: false,
  errors: {
    profile: null,
    avatar: null,
  },
  profileErrors: null,
  currentUserProfile: null,
  selectedUserProfile: null,
  // cabinet
  cabinetErrors: null,
  selectedUserCabinet: null,
  currentUserCabinet: null,
  currentUserLevels: [],
  currentUserQr: null,
  inputs: {
    settings: defaultProfileInputs,
  },
};

export default function persistReducer(
  state = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IProfileState {
  switch (type) {
    case constants.GET_PROFILE_SETTINGS:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
          profile: null,
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
        // loading: true,
        currentUserProfile: {
          ...state.currentUserProfile,
          ...payload,
        },
      };

    case constants.SEND_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          profile: payload,
        },
        /* inputs: {
          settings: { ...setErrors(state.inputs.settings, payload) },
        }, */
        // profileErrors: { ...setErrors(state.inputs.settings, payload) },
      };

    case constants.UPLOAD_AVATAR_FAIL:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          avatar: payload,
        },
      };

    case constants.SET_AVATAR:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          avatar: null,
        },
        currentUserProfile: {
          ...state.currentUserProfile!,
          avatar: payload,
        },
      };

    case constants.UPLOAD_AVATAR:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          avatar: null,
        },
      };

    // Cabinet
    case constants.GET_CABINET_DATA:
      return {
        ...state,
        loading: true,
        cabinetErrors: null,
      };

    case constants.SET_CABINET_DATA:
      return {
        ...state,
        loading: false,
        cabinetErrors: null,
        currentUserCabinet: (payload as IResponseCabinet).user,
        currentUserLevels: (payload as IResponseCabinet).levels,
      };

    case constants.SET_QR_CODE:
      return {
        ...state,
        loading: false,
        currentUserQr: payload,
      };

    case constants.GET_QR_CODE:
      return {
        ...state,
        loading: true,
        cabinetErrors: null,
      };

    case constants.GET_CABINET_DATA:
      return {
        ...state,
        loading: false,
        cabinetErrors: payload,
      };

    // Common
    case constants.CLEAR_PROFILE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
