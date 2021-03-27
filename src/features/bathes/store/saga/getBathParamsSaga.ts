import { call, put, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { GET_BATH_PARAMS_VARIETY } from '../bathConstants';
import { setBathParamsVariety } from '../bathActions';
import { IBathParamsVariety } from '~/src/app/models/bath';

function* getBathParamsSaga() {
  try {
    const params: IBathParamsVariety = yield call(methods.getBathParams, null, null);
    console.log({ params });
    yield put(setBathParamsVariety(params));
  } catch (error) {
    console.log('[getBathParamsSaga]', error);
  }
}

export default function* listener() {
  yield takeEvery(GET_BATH_PARAMS_VARIETY, getBathParamsSaga);
}
