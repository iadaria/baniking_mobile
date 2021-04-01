import { takeEvery } from 'redux-saga/effects';
import { GET_BATH } from '../bathConstants';

interface IAction {
  payload: number;
  type: string;
}

function* getBathSaga({ payload }: IAction) {
  const bathId = payload;
  __DEV__ && console.log('[getBathSaga]', bathId);
}

export default function* listener() {
  yield takeEvery(GET_BATH, getBathSaga);
}
