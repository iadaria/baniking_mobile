import { all } from 'redux-saga/effects';
import * as auth from '~/app/store/auth/saga';

const getListeners = (...args) =>
  args.reduce(
    (acc, nextArg) => [...acc, ...Object.values(nextArg).map((func) => func())],
    [],
  );
export default function* rootSaga() {
  yield all(getListeners(auth));
}
