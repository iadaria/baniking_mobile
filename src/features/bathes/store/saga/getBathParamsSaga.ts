import { call, put, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { IBathParamsResponse } from '~/src/app/models/bath';
import { GET_BATH_PARAMS_FILTERING } from '../bathConstants';
import { setBathFilterParams } from '../bathActions';
import { BathFilterParams } from '~/src/app/models/bath';
import { log, logline } from '~/src/app/utils/debug';

// var countParams = 0;

function* getBathParamsSaga() {
  /* countParams++;
  if (countParams > 3) {
    logline('[getBathParamsSAga] count > 3');
    setTimeout(function () {
      countParams = 0;
    }, 30000);
    return;
  } */
  try {
    const params: IBathParamsResponse = yield call(
      methods.getBathParams,
      null,
      null,
    );
    //logline({ params });
    const paramsFilter: BathFilterParams = {
      types: params.types,
      zones: new Map(Object.entries(params.zones) || {}),
      services: new Map(Object.entries(params.services) || {}),
      steamRooms: new Map(Object.entries(params.steamRooms) || {}),
    };
    yield put(setBathFilterParams(paramsFilter));
    log('paramsFilter', paramsFilter);
  } catch (error) {
    logline('[getBathParamsSaga]', error);
  }
}

export default function* listener() {
  yield takeEvery(GET_BATH_PARAMS_FILTERING, getBathParamsSaga);
}
