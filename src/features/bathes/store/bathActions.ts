import * as constants from './bathConstants';
import { EBathSort, IBath, IMap, TPartBathParams, IBathAction, IBathParamsVariety, IOrderCallParams } from '~/src/app/models/bath';
import { IErrors } from '~/src/app/utils/error';
import { IBathDetailed } from '~/src/app/models/bath';
import { IOrderCall } from '../../../app/models/bath';

export const getBathes = () => ({
  type: constants.GET_BATHES,
});

export const setBathes = (payload: { bathes: IBath[]; count: number; page: number }) => ({
  type: constants.SET_BATHES,
  payload,
});

export const bathesFail = (payload: IErrors | null) => ({
  type: constants.BATHES_FAIL,
  payload,
});

export const fetchBathes = (payload: IBathAction) => ({
  type: constants.FETCH_BATHES,
  payload,
});

export const updateBath = (payload: IBath) => ({
  type: constants.UPDATE_BATH,
  payload,
});

export const clearBathes = () => ({
  type: constants.CLEAR_BATHS,
});

export const reuseBathes = () => ({
  type: constants.REUSE_BATHES,
});

export const getBathParamsVariety = () => ({
  type: constants.GET_BATH_PARAMS_VARIETY,
});

export const setBathParamsVariety = (paramsVariety: IBathParamsVariety) => ({
  type: constants.SET_BATH_PARAMS_VARIETY,
  payload: paramsVariety,
});

// Bathes Filter
export const setFilter = (payload: { params: TPartBathParams }) => ({
  type: constants.SET_FILTER,
  payload,
});

export const setSort = (payload: { params: TPartBathParams; sort: EBathSort }) => ({
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

export const clearMaps = () => ({
  type: constants.CLEAR_MAPS,
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

// Comments
