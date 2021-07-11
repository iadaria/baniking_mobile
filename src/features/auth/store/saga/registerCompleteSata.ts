import { call, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { log, logline } from '~/src/app/utils/debug';
import { COMPLETE_REGISTER } from '../authConstants';

function* registerCompleteSaga({
  payload,
}: {
  type: string;
  payload: CompleteRegisterPayload;
}) {
  try {
    const result: unknown = yield call(methods.registerComplete, payload, null);
    logline('[registerCompleteSaga] result', result);
  } catch (e) {
    log('[registerCompleteSaga/error]', e);
  }
}

export default function* listener() {
  yield takeLatest(COMPLETE_REGISTER, registerCompleteSaga);
}
