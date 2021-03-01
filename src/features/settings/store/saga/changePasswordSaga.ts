import { IChangePassword } from '~/src/app/models/settings';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { takeLatest } from 'redux-saga/effects';
import { CHANGE_PASSWORD } from '~/src/features/auth/store/authConstants';

interface IAction {
  type: string;
  payload: IChangePassword;
}

function* changePasswordSaga({ payload }: IAction) {
  try {
    console.log('[changePasswordSaga] **** ', payload);
    const response = yield methods.changePassword(payload, null);
    console.log('[changePasswordSaga]', response);
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));

    let [errors, message, allErrors] = getErrorStrings(e);

    console.log([errors, message]);

    const errorMessage = allErrors ? allErrors : 'Введен неверный логин или пароль';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}
