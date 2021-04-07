import { put, takeLatest } from 'redux-saga/effects';
import { SEND_PROFILE_SETTINGS } from '../profileConstants';
import { IProfile } from '~/src/app/models/profile';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { sendProfileFail } from '../profileActions';
import { showAlert } from '~/src/app/common/components/showAlert';

interface IAction {
  type: string;
  payload: Partial<IProfile>;
}

function* sendProfileSettingsSaga({ payload }: IAction) {
  try {
    __DEV__ && console.log('[sendProfileSettingsSaga]payload ********', payload);

    yield methods.updateProfile(payload, null);
  } catch (e) {
    __DEV__ && console.log(JSON.stringify(e, null, 4));

    let [errors, message] = getErrorStrings(e);

    yield put(sendProfileFail(errors));

    __DEV__ && console.log('[sendProfileSettingsSaga]', [errors, message]);

    const errorMessage = 'Ошибка при сохранении основных настроек профиля';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(SEND_PROFILE_SETTINGS, sendProfileSettingsSaga);
}

/* const error = {
      data: {
        message: 'The given data was invalid.',
        errors: {
          surname: ['Необходимо ввести фамилию'],
          birth_date: ['Необходимо ввести дату рождения'],
          phone: ['Необходимо ввести номер телефона'],
          sex: ['Необходимо выбрать пол'],
        },
      },
    }; */
// __DEV__ && console.log('success saving');
// throw error;
