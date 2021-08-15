import * as constants from './permissionConstants';
import { Permit } from './permissionReducer';

export function checkPermissionLocation() {
  return {
    type: constants.CHECK_PERMISSION_LOCATION,
  };
}

export function setPermissionLocation(payload: [boolean, Permit]) {
  return {
    type: constants.SET_LOCATION_PERMISSION,
    payload,
  };
}

export function clearPermissionLocation() {
  return {
    type: constants.CLEAR_PERMISSION_LOCATION,
  };
}