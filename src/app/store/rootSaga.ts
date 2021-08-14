import { all, take } from 'redux-saga/effects';
import * as auth from '~/src/features/auth/store/saga';
import * as bath from '~/src/features/bathes/store/saga';
import * as city from '~/src/features/cities/store/saga';
import * as map from '~/src/features/map/store/saga';
import * as permission from '~/src/app/store/permission/saga';
import * as preferences from '~/src/features/persist/store/saga';
import * as profile from '~/src/features/profiles/store/saga';
import * as settings from '~/src/features/settings/store/saga';
import { REHYDRATE } from 'redux-persist/lib/constants';

const getListeners = (...args: any[]) =>
  args.reduce(
    (acc, nextArg) => [...acc, ...Object.values(nextArg).map((func) => func())],
    [],
  );

//  https://github.com/rt2zz/redux-persist/issues/794
export default function* rootSaga() {
  // yield all(getListeners(auth));
  //log('Waiting for rehydration');
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store

  yield all(
    getListeners(
      auth,
      profile,
      settings,
      bath,
      city,
      map,
      preferences,
      permission,
    ),
  );
}
