import { call, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { IBathParamsResponse } from '~/src/app/models/bath';
import { GET_BATH_PARAMS } from '../bathConstants';

function* getBathParamsSaga() {
  try {
    const r: IBathParamsResponse = yield call(methods.getBathParams, null, null);
    console.log('[getBathParamsSaga]', r);
  } catch (error) {
    console.log('[getBathParamsSaga]', error);
  }
}

export default function* listener() {
  yield takeEvery(GET_BATH_PARAMS, getBathParamsSaga);
}
