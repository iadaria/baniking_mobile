import * as constants from './systemConstants';

/** Title */

export function setTitlePoints(points: number) {
  return {
    type: constants.SET_TITLE_POINTS,
    payload: points,
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
