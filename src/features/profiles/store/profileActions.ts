import * as constants from './profileConstants';
import { IErrors } from '~/src/app/utils/error';
import { IProfile, IUploadAvatar, IResponseCabinet, IQr } from '~/src/app/models/profile';

/** Cabinet */

export const getCabinetData = (/** Read parameters */) => ({
  type: constants.GET_CABINET_DATA,
});

export const setCabinetData = (payload: IResponseCabinet) => ({
  type: constants.SET_CABINET_DATA,
  payload,
});

export const getQrCode = () => ({
  type: constants.GET_QR_CODE,
});

export const setQrCode = (qrCode: IQr) => ({
  type: constants.SET_QR_CODE,
  payload: qrCode,
});

export const cabinetDataFail = (payload: IErrors | null) => ({
  type: constants.SEND_PROFILE_FAIL,
  payload,
});

/** Profile */

export const getProfileSettings = (/** Read parameter */) => ({
  type: constants.GET_PROFILE_SETTINGS,
});

export const setProfileSettings = (payload: Partial<IProfile>) => ({
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

export const sendProfileSettings = (payload: Partial<IProfile>) => ({
  type: constants.SEND_PROFILE_SETTINGS,
  payload,
});

export const sendProfileFail = (payload: IErrors | null) => ({
  type: constants.SEND_PROFILE_FAIL,
  payload,
});

export const uploadAvatarFail = (payload: IErrors) => ({
  type: constants.UPLOAD_AVATAR_FAIL,
  payload,
});
