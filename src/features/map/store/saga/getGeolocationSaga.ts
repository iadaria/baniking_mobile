import { select, takeEvery } from 'redux-saga/effects';
import { DETECT_CITY } from '../mapConstants';
import { IRootState } from '~/src/app/store/rootReducer';

interface IAction {
  type: string;
}

interface IResult {
  results: {
    address_components: { long_name: string; short_name: string }[];
  }[];
}

function* getGeolocationSaga(_: IAction) {
  try {
    const { } = yield select(({ map }: IRootState) => )
    const { } = yield 
  }
}

export default function* listener() {
  yield takeEvery(DETECT_CITY, getGeolocationSaga);
}
