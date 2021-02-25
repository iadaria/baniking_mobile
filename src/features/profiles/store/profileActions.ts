import { IProfile, ICabinet } from '~/src/app/models/profile';
import * as constants from './profileConstants';
import { IUploadAvatar } from '~/src/app/models/profile';

/** Cabinet */

export const getCabinetData = (/** Read parameters */) => ({
  type: constants.GET_CABINET_DATA,
});

export const setCabinetData = (payload: ICabinet) => ({
  type: constants.SET_CABINET_DATA,
  payload,
});

/** Profile */

export const getProfileSettings = (/** Read parameter */) => ({
  type: constants.GET_PROFILE_SETTINGS,
});

export const setProfileSettings = (payload: IProfile) => ({
  type: constants.SET_PROFILE_SETTINGS,
  payload,
});

export const uploadAvatar = (payload: IUploadAvatar) => ({
  type: constants.UPLOAD_AVATAR,
  payload,
});

export const initProfileInputs = (payload: IProfile) => {
  return {
    type: constants.INIT_PROFILE_INPUTS,
    payload,
  };
};

export const sendProfileSettings = (payload: IProfile) => ({
  type: constants.SEND_PROFILE_SETTINGS,
  payload,
});

/* export const uploadAvatar = (payload: UploadAvatar) => ({
  type: constants.UPLOAD_AVATAR, payload,
});
 */
