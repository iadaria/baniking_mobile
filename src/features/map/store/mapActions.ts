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

export const setGeoLocation = (payload: Location) => ({
  type: constants.SET_GEOLOCATION,
  payload,
});
