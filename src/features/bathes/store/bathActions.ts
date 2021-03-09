import * as constants from './bathConstants';
import { IBath } from '~/src/app/models/bath';

export const getBathes = () => ({
  type: constants.GET_BATHES,
});

export const setBathes = (bathes: IBath[]) => ({
  type: constants.SET_BATHES,
  payload: bathes,
});
