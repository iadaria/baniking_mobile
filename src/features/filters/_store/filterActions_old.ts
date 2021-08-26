import * as constants from './filterConstants';
import {
  BathSort,
  BathParams,
  BathTouchParams,
  BathParam,
} from '~/src/app/models/bath';
import { IErrors } from '~/src/app/utils/error';

// using
export const setParams = (payload: BathParams) => ({
  type: constants.SET_PARAMS,
  payload,
});

// using
export const nextPage = () => ({
  type: constants.NEXT_PAGE,
});

export const setBathParam = (payload: BathParam) => ({
  type: constants.SET_BATH_PARAM,
  payload,
});

// using
export const getBathTouchParams = () => ({
  type: constants.GET_BATH_PARAMS_FILTERING,
});

// using
export const setBathTouchParams = (paramsTouch: BathTouchParams) => ({
  type: constants.SET_BATH_PARAMS_FILTERING,
  payload: paramsTouch,
});

// using
export const checkInit = () => ({
  type: constants.CHECK_INIT,
});

// using
export const checkFilter = () => ({
  type: constants.CHECK_FILTER,
});

// page always = 0
// using
export const setCheckCount = (payload: number) => ({
  type: constants.SET_CHECK_COUNT,
  payload,
});

// using
export const acceptFilter = () => ({
  type: constants.ACCEPT_FILTER,
});

export const checkFilterFail = (payload: IErrors | null) => ({
  type: constants.CHECK_FILTER_FAIL,
  payload,
});

export const setFilter = (payload: { params: BathParams }) => ({
  type: constants.SET_FILTER,
  payload,
});

export const setSort = (payload: BathSort) => ({
  type: constants.SET_SORT,
  payload,
});

// using
export const checkClean = () => ({
  type: constants.CHECK_CLEAN,
});
