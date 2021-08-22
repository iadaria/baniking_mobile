import * as constants from './baseFilterConstants';
import { BathMainParams } from '~/src/app/models/filter';

export const changeParams = (payload: BathMainParams) => ({
  type: constants.CHANGE_PARAMS,
  payload,
});

export const nextPage = () => ({
  type: constants.NEXT_PAGE,
});
