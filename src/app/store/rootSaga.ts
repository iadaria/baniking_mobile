import { all } from 'redux-saga/effects';
import * as auth from '~/src/features/auth/store/saga';
import * as profile from '~/src/features/profiles/store/saga';
import * as persist from '~/src/features/persist/store/saga';

/* const getListeners = (...args) =>
  args.reduce((acc, nextArg) => [...acc, ...Object.values(nextArg).map((func) => func())], []); */

export default function* rootSaga() {
  // yield all(getListeners(auth));
  yield all([auth.emailLoginSaga(), auth.socialLoginSaga(), auth.recoveryPasswordSaga(), auth.checkAuthSaga()]);
  yield all([profile.getProfileDataSaga(), profile.getCabinetDataSaga()]);
  yield all([persist.logoutSaga()]),
}
