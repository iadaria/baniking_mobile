import * as constants from './mapConstants';

export const detectCity = () => ({
  type: constants.DETECT_CITY,
});

export const setDetectedCity = (payload: string) => ({
  type: constants.SET_DETECTED_CITY,
  payload,
});

export const mapFail = () => ({
  type: constants.MAP_FAIL,
});
