import * as constants from './filterConstants';
import { BathMainParams, TouchParams } from '~/src/app/models/filter';

export const changeParams = (payload: BathMainParams) => ({
  type: constants.CHANGE_PARAMS,
  payload,
});

export const nextPage = () => ({
  type: constants.NEXT_PAGE,
});

export const fetchTouchParams = () => ({
  type: constants.FETCH_TOUCH_PARAMS,
});

export const setTouchParams = (paramsTouch: TouchParams) => ({
  type: constants.SET_TOUCH_PARAMS,
  payload: paramsTouch,
});
