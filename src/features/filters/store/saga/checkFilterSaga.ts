import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Bath } from '~/src/app/models/bath';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { IFilterState } from '../filterReducer';
import { CHECK_EXTRA_FILTER } from '../filterConstants';
import { checkFilterFail, setCheckedCount } from '../flterActions';
import { log, logline } from '~/src/app/utils/debug';

interface IAction {
  type: string;
}

interface IResult {
  count: number;
  baths: Bath[];
}

function* checkFilterSaga(_: IAction) {
  try {
    const { params, extraParams }: IFilterState = yield select(
      (state: IRootState) => state.filter,
    );
    const checkParams = { ...params, ...extraParams };
    logline('\n\n***[checkFilterSaga] checkParams', checkParams);

    const { count }: IResult = yield call(methods.getBathes, null, checkParams);
    //logline('[checkFilter]', { count });
    yield put(setCheckedCount(count));
  } catch (e) {
    log('[checkFilterSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(checkFilterFail(errors));

    logline('[checkFilterSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка при получении данных о банях';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(CHECK_EXTRA_FILTER, checkFilterSaga);
}
