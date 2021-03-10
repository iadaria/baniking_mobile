import * as constants from './bathConstants';
import { IBath } from '~/src/app/models/bath';
import { IErrors } from '~/src/app/utils/error';

export const getBathes = () => ({
  type: constants.GET_BATHES,
});

export const setBathes = (bathes: IBath[]) => ({
  type: constants.SET_BATHES,
  payload: bathes,
});

export const bathesFail = (payload: IErrors | null) => ({
  type: constants.BATHES_FAIL,
  payload,
});
