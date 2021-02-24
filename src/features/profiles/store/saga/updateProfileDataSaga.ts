import { takeLatest } from 'redux-saga/effects';
import { SEND_PROFILE_SETTINGS } from '../profileConstants';

function* updateProfileDataSaga() {
  try {
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
  }
}

export default function* listener() {
  yield takeLatest(SEND_PROFILE_SETTINGS, updateProfileDataSaga);
}
