import { put, takeLatest } from 'redux-saga/effects';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';
import { logout } from '../appPersistActions';
import { ASK_LOGOUT } from '../appPersistConstants';

function* logoutSaga() {
  console.log('ask logout');

  yield put(logout());
  yield AsyncStorage.clear();
  RNRestart.Restart();
}

export default function* listener() {
  yield takeLatest(ASK_LOGOUT, logoutSaga);
}
