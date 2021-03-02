import * as constants from './systemConstants';

/** Drawer */

export function openDrawer() {
  return {
    type: constants.OPEN_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: constants.CLOSE_DRAWER,
  };
}

/** Backward */

export function enableBackward() {
  return {
    type: constants.ENABLE_BACKWARD,
  };
}

export function disableBackward() {
  return {
    type: constants.DISABLE_BACKWARD,
  };
}

export function pushBackward(screen: string) {
  return {
    type: constants.PUSH_BACKWARD,
    payload: screen,
  };
}

export function pullBackward() {
  return {
    type: constants.PULL_BACKWARD,
  };
}

export function clearBackward() {
  return {
    type: constants.CLEAR_BACKWARD,
  };
}

/** Title */

export function setTitlePoints(points: number) {
  return {
    type: constants.SET_TITLE_POINTS,
    payload: points,
  };
}

/** Common */
export function clearSystem() {
  return {
    type: constants.CLEAR_SYSTEM,
  };
}
