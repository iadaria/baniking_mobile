import { put, takeLatest } from 'redux-saga/effects';
import { ASK_LOGOUT } from '../appPersistConstants';
import { authLogout } from '../../../auth/store/authActions';
import { logline } from '~/src/app/utils/debug';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { routes } from '~/src/navigation/helpers/routes';

function* logoutSaga() {
  logline('', '!![logoutSaga] ask logout');

  yield put(authLogout());
  RootNavigation.reset(routes.navigators.AuthNavigator);
  // yield AsyncStorage.clear();
  // RNRestart.Restart();
}

export default function* listener() {
  yield takeLatest(ASK_LOGOUT, logoutSaga);
}
