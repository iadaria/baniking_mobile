import { IErrors } from '~/src/app/utils/error';
import * as constants from './settingsConstants';

export interface ISettingsState {
  loading: boolean;
  errors: IErrors | null;
}

const initialState: ISettingsState = {
  loading: false,
  errors: null,
};

export default function settingsReducer(
  state: ISettingsState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): ISettingsState {
  switch (type) {
    case constants.CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case constants.SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case constants.SETTINGS_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
