import * as constants from './bathConstants';
import { Bath, IMap, IOrderCallParams } from '~/src/app/models/bath';
import { IErrors } from '~/src/app/utils/error';
import { IBathDetailed } from '~/src/app/models/bath';
import { IOrderCall } from '~/src/app/models/bath';

export const addBathes = (payload: { bathes: Bath[]; count: number }) => ({
  type: constants.ADD_BATHES,
  payload,
});

export const fetchBathes = () => ({
  type: constants.FETCH_BATHES,
});

/* export const setBathesCount = (payload: number) => ({
  type: constants.SET_BATHES_COUNT,
  payload,
});
 */
export const bathesFail = (payload: IErrors | null) => ({
  type: constants.BATHES_FAIL,
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

// Bath
export const getBath = () => ({
  type: constants.GET_BATH,
});

export const setSelectedBath = (payload: IBathDetailed) => ({
  type: constants.SET_SELECTED_BATH,
  payload,
});

export const selectBath = (payload: number) => ({
  type: constants.SELECT_BATH,
  payload,
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
