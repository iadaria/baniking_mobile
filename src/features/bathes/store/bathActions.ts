import * as constants from './bathConstants';
import { EBathSort, IBath, TPartBathParams } from '~/src/app/models/bath';
import { IErrors } from '~/src/app/utils/error';
import { IBathAction } from '~/src/app/models/bath';

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

// Bathes Filter
export const setFilter = (payload: TPartBathParams) => ({
  type: constants.SET_FILTER,
  payload,
});

export const setSort = (payload: { params: TPartBathParams; sort: EBathSort }) => ({
  type: constants.SET_SORT,
  payload,
});

// Bath
export const selectBath = (payload: IBath) => ({
  type: constants.SELECT_BATH,
  payload,
});

export const clearSelectedBath = () => ({
  type: constants.CLEAR_SELECTED_BATH,
});

// Comments
