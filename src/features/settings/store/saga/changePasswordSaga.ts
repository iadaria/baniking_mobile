import { IChangePassword } from '~/src/app/models/settings';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { takeLatest, put } from 'redux-saga/effects';
import { settingsFail, settingsSuccess } from '../settingsActions';
import { CHANGE_PASSWORD } from '../settingsConstants';

interface IAction {
  type: string;
  payload: IChangePassword;
}

function* changePasswordSaga({ payload }: IAction) {
  try {
    console.log('[changePasswordSaga] **** ', payload);
    const response = yield methods.changePassword(payload, null);
    console.log('[changePasswordSaga]', response);

    yield put(settingsSuccess());
    yield showAlert('Сообщение', 'Ваш пароль изменен');
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(settingsFail(errors));

    console.log([errors, message, allErrors]);

    /*let errorMessage: string | null = null;

    errorMessage = !allErrors ? allErrors : 'Введен неверный логин или пароль';

    if (!errorMessage) {
      yield showAlert('Ошибка', errorMessage);
    } */
  }
}

export default function* listener() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}
