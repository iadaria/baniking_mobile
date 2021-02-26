import { takeLatest } from 'redux-saga/effects';
import { SEND_PROFILE_SETTINGS } from '../profileConstants';
import { IProfile } from '~/src/app/models/profile';
import { methods } from '~/src/app/api';

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
  }
}

export default function* listener() {
  yield takeLatest(SEND_PROFILE_SETTINGS, sendProfileSettingsSaga);
}
