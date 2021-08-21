import * as constants from './baseFilterConstants';
import { BathMainParams, BathSort } from '~/src/app/models/filter';

/* export const changeParam = (payload: BathMainParam) => ({
  type: constants.CHANGE_PARAM,
  payload,
});
 */
export const changeParams = (payload: BathMainParams) => ({
  type: constants.CHANGE_PARAMS,
  payload,
});

export const nextPage = () => ({
  type: constants.NEXT_PAGE,
});

export const setSort = (payload: BathSort) => ({
  type: constants.SET_SORT,
  payload,
});
