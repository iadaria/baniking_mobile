import * as constants from './filterConstants';
import { BathMainParams, TouchParams } from '~/src/app/models/filter';
import { IErrors } from '~/src/app/utils/error';

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

export const checkFilter = () => ({
  type: constants.CHECK_EXTRA_FILTER,
});

export const setCheckedCount = (payload: number) => ({
  type: constants.SET_CHECKED_COUNT,
  payload,
});

export const checkFilterFail = (payload: IErrors | null) => ({
  type: constants.CHECK_EXTRA_FILTER_FAIL,
  payload,
});

export const acceptExtraParams = () => ({
  type: constants.ACCEPT_EXTRA_PARAMS,
});

export const cleanExtraParams = () => ({
  type: constants.CLEAN_EXTRA_PARAMS,
});

export const rollbackExtraParams = () => ({
  type: constants.ROLLBACK_EXTRA_PARAMS,
});
