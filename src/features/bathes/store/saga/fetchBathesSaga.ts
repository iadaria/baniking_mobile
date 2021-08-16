import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Bath } from '~/src/app/models/bath';
import { FETCH_BATHES } from '../bathConstants';
import { IRootState } from '~/src/app/store/rootReducer';
import { log, logline } from '~/src/app/utils/debug';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { addBathes, bathesFail, setBathesCount } from '../bathActions';
import { IFilterState } from '~/src/features/filters/store/filterReducer';

interface IAction {
  type: string;
}

interface IResult {
  count: number;
  baths: Bath[];
}

function* fetchBathesSaga(_: IAction) {
  try {
    const { params }: IFilterState = yield select(
      (state: IRootState) => state.filter,
    );

    const result: IResult = yield call(methods.getBathes, null, params, null);

    const { count, baths } = result;
    logline('***[fetchBathesSaga] params ' + count, params);
    yield put(addBathes(baths));
    yield put(setBathesCount(count));
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
