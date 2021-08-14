import * as constants from './permissionConstants';
import { Permit } from './permissionReducer';

export function checkPermissionLocation() {
  return {
    type: constants.CHECK_PERMISSION_LOCATION,
  };
}

export function denyPermissionLocation() {
  return {
    type: constants.DENY_LOCATION_PERMISSION,
  };
}

export function acceptPermissionLocation() {
  return {
    type: constants.ACCEPT_LOCATION_PERMISSION,
  };
}

export function setPermissionLocation(payload: [boolean, Permit]) {
  return {
    type: constants.SET_LOCATION_PERMISSION,
    payload,
  };
}

export function askPermissionLocation() {
  return {
    type: constants.ASK_LOCATION_PERMISSION,
  };
}
