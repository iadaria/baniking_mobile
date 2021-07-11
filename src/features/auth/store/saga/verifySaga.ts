import { call, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { VerifyPayload } from '~/src/app/models/user';
import { log, logline } from '~/src/app/utils/debug';
import { VERIFY } from '../authConstants';

function* verifySaga({ payload }: { type: string; payload: VerifyPayload }) {
  try {
    const result: unknown = yield call(methods.verify, payload, null);
    logline('[verifySaga] result', result);
  } catch (e) {
    log('[verifySaga/error]', e);
  }
}

export default function* listener() {
  yield takeLatest(VERIFY, verifySaga);
}
