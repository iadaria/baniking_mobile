import { all } from 'redux-saga/effects';
import * as auth from '~/app/store/auth/saga';

export default function* rootSaga() {
  yield all(auth);
}
