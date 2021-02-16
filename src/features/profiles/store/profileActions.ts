import { IProfile } from '~/src/app/models/profile';
import * as constants from './profileConstants';

export const getProfileData = () => ({
  type: constants.GET_PROFILE_DATA,
});

export const setProfileData = (payload: IProfile) => ({
  type: constants.SET_PROFILE_DATA,
  payload,
});

export const sendProfileData = () => ({
  type: constants.SEND_PROFILE_DATA,
});
/* export const uploadAvatar = (payload: UploadAvatar) => ({
  type: constants.UPLOAD_AVATAR, payload,
});
 */
