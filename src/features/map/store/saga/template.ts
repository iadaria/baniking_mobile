import { put, select, takeEvery } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { methods } from '~/src/app/api';
import { IRootState } from '~/src/app/store/rootReducer';
import { log, logline } from '~/src/app/utils/debug';

interface IAction {
  type: string;
}

interface IResult {
  id: string;
}

function* $Saga(_: IAction) {
  logline('[$Saga]', '***');
  try {
    const { } = yield select(({ }: IRootState) => );
    const r: IResult = yield methods.name(paylaod, params)
  } catch (e) {
    log('[$Saga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(Fail());

    logline('[$Saga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка ...';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(CONSTANT, $Saga);
}