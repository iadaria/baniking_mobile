import { call, put, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { IBathParamsResponse } from '~/src/app/models/bath';
import { GET_BATH_PARAMS_VARIETY } from '../bathConstants';
import { setBathParamsVariety } from '../bathActions';
import { IBathParamsVariety } from '~/src/app/models/bath';

// var countParams = 0;

function* getBathParamsSaga() {
  /* countParams++;
  if (countParams > 3) {
    __DEV__ && console.log('[getBathParamsSAga] count > 3');
    setTimeout(function () {
      countParams = 0;
    }, 30000);
    return;
  } */
  try {
    const params: IBathParamsResponse = yield call(methods.getBathParams, null, null);
    //__DEV__ && console.log({ params });
    const paramsVariety: IBathParamsVariety = {
      types: params.types,
      zones: new Map(Object.entries(params.zones) || {}),
      services: new Map(Object.entries(params.services) || {}),
      steamRooms: new Map(Object.entries(params.steamRooms) || {}),
    };
    yield put(setBathParamsVariety(paramsVariety));
    //__DEV__ && console.log(paramsVariety);
  } catch (error) {
    __DEV__ && console.log('[getBathParamsSaga]', error);
  }
}

export default function* listener() {
  yield takeEvery(GET_BATH_PARAMS_VARIETY, getBathParamsSaga);
}
