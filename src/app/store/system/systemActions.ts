import * as constants from './systemConstants';

/** Title */

export function setTitlePoints(points: number) {
  return {
    type: constants.SET_TITLE_POINTS,
    payload: points,
  };
}

export function transparentHeader() {
  return {
    type: constants.TRANSPARENT_HEADER,
  };
}

export function nonTransparentHeader() {
  return {
    type: constants.NON_TRANSPARENT_HEADER,
  };
}

/** Network */

export function updateStateConnection(state: boolean | null) {
  return {
    type: constants.UPDATE_STATE_CONNECTION,
    payload: state,
  };
}

/** Common */
export function clearSystem() {
  return {
    type: constants.CLEAR_SYSTEM,
  };
}
