import { IChangePassword } from '~/src/app/models/settings';
import { IErrors } from '~/src/app/utils/error';
import * as constants from './settingsConstants';

export const changePassword = (payload: IChangePassword) => ({
  type: constants.CHANGE_PASSWORD,
  payload,
});

export const settingsSuccess = () => ({
  type: constants.SETTINGS_SUCCESS,
});

export const uploadAvatarFail = (payload: IErrors | null) => ({
  type: constants.SETTINGS_FAIL,
  payload,
});