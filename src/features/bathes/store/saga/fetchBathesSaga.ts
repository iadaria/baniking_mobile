import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Bath } from '~/src/app/models/bath';
import { addBathes, bathesFail } from '../bathActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBaseFilterState } from '~/src/features/filters/base/store/baseFilterReducer';
import { FETCH_BATHES } from '../bathConstants';
import { log, logline } from '~/src/app/utils/debug';

interface IAction {
  type: string;
}

interface IResult {
  baths: Bath[];
  count: number;
}

function* fetchBathesSaga(_: IAction) {
  try {
    const { params }: IBaseFilterState = yield select(
      (state: IRootState) => state.baseFilter,
    );
    const result: IResult = yield call(methods.getBathes, null, params, null);

    const { count, baths } = result;
    logline('\n\n***[fetchBathesSaga] params ' + count, params);
    yield put(addBathes({ bathes: baths, count }));
    //yield put(setBathesCount(count));
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
