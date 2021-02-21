import { all, take } from 'redux-saga/effects';
import * as auth from '~/src/features/auth/store/saga';
import * as profile from '~/src/features/profiles/store/saga';
import * as persist from '~/src/features/persist/store/saga';
import { REHYDRATE } from 'redux-persist/lib/constants';

/* const getListeners = (...args) =>
  args.reduce((acc, nextArg) => [...acc, ...Object.values(nextArg).map((func) => func())], []); */

export default function* rootSaga() {
  // yield all(getListeners(auth));
  console.log('Waiting for rehydration');
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store

  yield all([auth.emailLoginSaga(), auth.socialLoginSaga(), auth.recoveryPasswordSaga(), auth.checkAuthSaga()]);
  yield all([profile.getProfileDataSaga(), profile.getCabinetDataSaga()]);
  yield all([persist.logoutSaga()]);
}
