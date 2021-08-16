import * as constants from './bathConstants';
import {
  BathSort,
  Bath,
  IMap,
  BathParams,
  BathFilterParams,
  IOrderCallParams,
  BathParam,
} from '~/src/app/models/bath';
import { IErrors } from '~/src/app/utils/error';
import { IBathDetailed } from '~/src/app/models/bath';
import { IOrderCall } from '~/src/app/models/bath';

// using
export const setParams = (payload: BathParams) => ({
  type: constants.SET_PARAMS,
  payload,
});

// using
export const nextPage = () => ({
  type: constants.NEXT_PAGE,
});

// using
export const addBathes = (payload: Bath[]) => ({
  type: constants.ADD_BATHES,
  payload,
});

// using
export const fetchBathes = () => ({
  type: constants.FETCH_BATHES,
});

// using
export const setBathesCount = (payload: number) => ({
  type: constants.SET_BATHES_COUNT,
  payload,
});

export const setBathParam = (payload: BathParam) => ({
  type: constants.SET_BATH_PARAM,
  payload,
});

// using
export const getBathFilterParams = () => ({
  type: constants.GET_BATH_PARAMS_FILTERING,
});

// using
export const setBathFilterParams = (paramsFilter: BathFilterParams) => ({
  type: constants.SET_BATH_PARAMS_FILTERING,
  payload: paramsFilter,
});

// using
export const checkInit = () => ({
  type: constants.CHECK_INIT,
});

// using
export const checkClean = () => ({
  type: constants.CHECK_CLEAN,
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

// using
export const bathesFail = (payload: IErrors | null) => ({
  type: constants.BATHES_FAIL,
  payload,
});
// using
export const setNear = () => ({
  type: constants.SET_NEAR,
});
// using
export const notNear = () => ({
  type: constants.NOT_NEAR,
});
// using
export const changeNear = (payload: boolean) => ({
  type: constants.CHANGE_NEAR,
  payload,
});

/************************************** */

export const getBathes = () => ({
  type: constants.GET_BATHES,
});

export const setBathes = (payload: {
  bathes: Bath[];
  count: number;
  page: number;
}) => ({
  type: constants.SET_BATHES,
  payload,
});

export const updateBath = (payload: Bath) => ({
  type: constants.UPDATE_BATH,
  payload,
});

export const clearBathes = () => ({
  type: constants.CLEAR_BATHS,
});

export const reuseBathes = () => ({
  type: constants.REUSE_BATHES,
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

// Bath
export const getBath = (bathId: number) => ({
  type: constants.GET_BATH,
  payload: bathId,
});

export const selectBath = (bathDetailed: IBathDetailed) => ({
  type: constants.SELECT_BATH,
  payload: bathDetailed,
});

export const clearSelectedBath = () => ({
  type: constants.CLEAR_SELECTED_BATH,
});

// Maps

export const setMaps = (payload: IMap[]) => ({
  type: constants.SET_MAPS,
  payload,
});

export const addMap = (payload: IMap) => ({
  type: constants.ADD_MAP,
  payload,
});

export const clearMaps = () => ({
  type: constants.CLEAR_MAPS,
});

export const fetchMaps = (bathes: Bath[]) => ({
  type: constants.FETCH_MAPS,
  payload: bathes,
});

// Order

export const initOrderCallInputs = (payload: IOrderCall) => {
  return {
    type: constants.INIT_ORDER_CALL_INPUTS,
    payload,
  };
};

export const orderCall = (payload: IOrderCallParams) => ({
  type: constants.ORDER_CALL,
  payload,
});
