import { Location } from '~/src/app/models/map';
import * as constants from './mapConstants';

export const mapRequest = () => ({
  type: constants.MAP_REQUEST,
});

export const mapFail = () => ({
  type: constants.MAP_FAIL,
});

export const detectCity = () => ({
  type: constants.DETECT_CITY,
});

export const detectGeo = () => ({
  type: constants.DETECT_GEO_LOCATION,
});

export const setDetectedCity = (payload: string) => ({
  type: constants.SET_DETECTED_CITY,
  payload,
});

export const setGeoLocation = (payload: Location) => ({
  type: constants.SET_GEOLOCATION,
  payload,
});

export const selectCity = (payload: number) => ({
  type: constants.SELECT_CITY,
  payload,
});

export const unselectCity = () => ({
  type: constants.UNSELECT_CITY,
});