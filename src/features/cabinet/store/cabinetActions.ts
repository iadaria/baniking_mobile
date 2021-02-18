import { ICabinet } from '~/src/app/models/profile';
import * as constants from './cabinetConstants';

export const getCabinetData = () => ({
  type: constants.GET_CABINET_DATA,
});

export const setCabinetData = (payload: ICabinet) => ({
  type: constants.SET_CABINET_DATA,
  payload,
});

export const sendCabinetData = () => ({
  type: constants.SEND_CABINET_DATA,
});
/* export const uploadAvatar = (payload: UploadAvatar) => ({
  type: constants.UPLOAD_AVATAR, payload,
});
 */
