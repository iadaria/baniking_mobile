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
    console.log('payload', payload);

    // yield methods.updateProfile(payload, null);
    const error = {
      data: {
        message: 'The given data was invalid.',
        errors: {
          surname: ['Необходимо ввести фамилию'],
          birth_date: ['Необходимо ввести дату рождения'],
          phone: ['Необходимо ввести номер телефона'],
          sex: ['Необходимо выбрать пол'],
        },
      },
    };
    // console.log('success saving');
    throw error;
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));

    let [errors, message] = getErrorStrings(e);

    yield put(sendProfileFail(errors));

    console.log('[sendProfileSettingsSaga]', [errors, message]);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';
    errorMessage = 'Ошибка при сохранении основных настроек профиля';


    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(SEND_PROFILE_SETTINGS, sendProfileSettingsSaga);
}
