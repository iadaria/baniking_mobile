import { put, takeLatest } from 'redux-saga/effects';
import { logout } from '../appPersistActions';
import { ASK_LOGOUT } from '../appPersistConstants';
import { authLogout } from '../../../auth/store/authActions';

function* logoutSaga() {
  __DEV__ && console.log('!![logoutSaga] ask logout');

  yield put(logout());
  yield put(authLogout());
  // yield AsyncStorage.clear();
  // RNRestart.Restart();
}

export default function* listener() {
  yield takeLatest(ASK_LOGOUT, logoutSaga);
}
