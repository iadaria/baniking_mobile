import { IChangePassword } from '~/src/app/models/settings';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { takeLatest, put } from 'redux-saga/effects';
import { settingsFail, settingsSuccess } from '../settingsActions';
import { CHANGE_PASSWORD } from '../settingsConstants';
import { log, logline } from '~/src/app/utils/debug';

interface IAction {
  type: string;
  payload: IChangePassword;
}

function* changePasswordSaga({ payload }: IAction) {
  try {
    log('[changePasswordSaga] **** ', payload);
    const response: unknown = yield methods.changePassword(payload, null);
    log('[changePasswordSaga]', response);

    yield put(settingsSuccess());
    yield showAlert('Сообщение', 'Ваш пароль изменен');
  } catch (e) {
    log('[changePasswordSaga]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(settingsFail(errors));

    logline('', [errors, message, allErrors]);

    if (errors && errors?.new_password_confirmation.includes('не совпадают')) {
      errors.new_password_confirmation =
        'Значение должно совпадать с новым паролем';
    }

    if (errors && errors.new_password) {
      delete errors.new_password;
    }
  }
}

export default function* listener() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}
