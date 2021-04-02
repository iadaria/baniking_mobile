import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { Response } from 'react-native-image-resizer';
import { IRootState } from '~/src/app/store/rootReducer';
import { getErrorStrings } from '~/src/app/utils/error';
import { bathesFail, selectBath } from '../bathActions';
import { GET_BATH } from '../bathConstants';
import { IBathDetailed, IProposition, ISchedule } from '~/src/app/models/bath';
import { methods } from '~/src/app/api';
import { getFileName, replaceExtension } from '~/src/app/utils/common';
import { cacheImage } from '~/src/app/utils/bathUtility';
import { persistImage } from '~/src/features/persist/store/appPersistActions';

interface IAction {
  payload: number;
  type: string;
}

interface IResult {
  bath: IBathDetailed;
  schedule: ISchedule;
  zones: string[][];
  services: string[][];
  steam_rooms: string[][];
  photos: string[][];
  propositions: IProposition[];
}

var countBathRequest = 0;

function* getBathSaga({ payload }: IAction) {
  countBathRequest++;
  if (countBathRequest > 3) {
    console.log('[getBathSaga] count > 3');
    setTimeout(function () {
      countBathRequest = 0;
    }, 10000);
    return;
  }

  const bathId = payload;
  __DEV__ && console.log('[getBathSaga]', bathId);

  try {
    const response: IResult = yield call(methods.getBath, null, bathId);
    //__DEV__ && console.log('[getBathSaga]', JSON.stringify(response.bath, null, 4));
    const bathDetailed: IBathDetailed = {
      ...response.bath,
      schedule: response.schedule,
      zones: [].concat(...response.zones),
      photos: [].concat(...response.photos),
      services: [].concat(...response.services),
      steam_rooms: [].concat(...response.steam_rooms),
      propositions: response.propositions,
    };
    //__DEV__ && console.log('[getBathSaga/bathDetailed]', JSON.stringify(bathDetailed, null, 4));
    yield put(selectBath(bathDetailed));
    yield fork(cacheImageBathSaga, bathDetailed);
  } catch (e) {
    __DEV__ && console.log('[getBathSaga/error]', JSON.stringify(e, null, 4));
    const [errors, message, allErrors] = getErrorStrings(e);
    let errorMessage = allErrors ? allErrors : message; //? message : 'Ошибка при получении данных';
    __DEV__ && console.log(JSON.stringify(e, null, 4));
    __DEV__ && console.log('[fetchBathesSaga]', [errors, message]);

    if (errorMessage) {
      yield put(bathesFail(errors));
      yield showAlert('Ошибка', errorMessage);
    }

    if (!errorMessage) {
      const connection = select(({ system }: IRootState) => system.connection);
      if (!connection) {
        errorMessage = 'Ошибка запроса при отсутствии сети';
      }
      if (connection) {
        errorMessage = 'Ошибка при получении данных';
      }

      yield put(bathesFail(null));
      yield showAlert('Ошибка', errorMessage);
    }
  }
}

function* cacheImageBathSaga(bathDetailed: IBathDetailed) {
  const set: string[] = yield select((state: IRootState) => state.persist.image.set);
  const imagesForCache = [bathDetailed.image, ...bathDetailed.photos];
  for (let i = 0; i < imagesForCache.length; i++) {
    const fileNameExtension = getFileName(imagesForCache[i]);
    const fileName = replaceExtension(fileNameExtension, '');
    const indexOf = set.indexOf(fileName);
    if (indexOf === -1) {
      try {
        const response: Response = yield cacheImage(imagesForCache[i]);
        yield put(persistImage({ id: fileName, path: response.uri }));
        __DEV__ && console.log('getBathSaga persistImage', fileName);
      } catch (error) {
        __DEV__ && console.log('getBathSaga/error', error);
      }
    }
  }
}

export default function* listener() {
  yield takeEvery(GET_BATH, getBathSaga);
}
