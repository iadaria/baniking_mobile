import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { Bath } from '~/src/app/models/bath';
import { addBathes, bathesFail } from '../bathActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { IRootState } from '~/src/app/store/rootReducer';
import { IFilterState } from '~/src/features/filters/store/filterReducer';
import { FETCH_BATHES } from '../bathConstants';
import { log, logline } from '~/src/app/utils/debug';
import { fetchMapsSaga } from './fetchMapsSaga';

interface IAction {
  type: string;
}

interface IResult {
  baths: Bath[];
  count: number;
}

function* fetchBathesSaga(_: IAction) {
  try {
    const { params }: IFilterState = yield select(
      (state: IRootState) => state.filter,
    );
    const result: IResult = yield call(methods.getBathes, null, params, null);

    const { count, baths } = result;
    logline('\n\n***[fetchBathesSaga] params ' + count, params);
    yield put(addBathes({ bathes: baths, count }));
    yield fork(fetchMapsSaga, { payload: baths });
  } catch (e) {
    log('[fetchBathesSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(bathesFail(errors));

    logline('[fetchBathesSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка при получении данных о банях';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(FETCH_BATHES, fetchBathesSaga);
}
