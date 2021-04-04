import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { getErrorStrings } from '~/src/app/utils/error';
import { bathesFail, selectBath } from '../bathActions';
import { GET_BATH } from '../bathConstants';
import { IBathDetailed, IProposition, ISchedule } from '~/src/app/models/bath';
import { methods } from '~/src/app/api';
import { cacheImages } from '~/src/app/utils/bathUtility';
import { persistImage } from '~/src/features/persist/store/appPersistActions';
import { IBather } from '~/src/app/models/bath';
import { IPersistImage } from '~/src/app/models/persist';

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
  bathers: IBather[];
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
      bathers: response.bathers,
    };
    //__DEV__ && console.log('[getBathSaga/bathDetailed]', JSON.stringify(bathDetailed, null, 4));
    yield put(selectBath(bathDetailed));
    yield fork(cacheImageBathSaga, bathDetailed);
  } catch (e) {
    ///__DEV__ && console.log('[getBathSaga/error]', JSON.stringify(e, null, 4));
    const [errors, message, allErrors] = getErrorStrings(e);
    let errorMessage = allErrors ? allErrors : message; //? message : 'Ошибка при получении данных';
    //__DEV__ && console.log(JSON.stringify(e, null, 4));
    //__DEV__ && console.log('[fetchBathesSaga]', [errors, message]);

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

// Меняем размер и кэшируем изображения бань и банщиков
function* cacheImageBathSaga(bathDetailed: IBathDetailed) {
  const set: string[] = yield select((state: IRootState) => state.persist.image.set);

  const bathImages = [bathDetailed.image, ...bathDetailed.photos];
  const cachedbathImages: IPersistImage[] = yield cacheImages(bathImages, set, 500);

  const bathersAvatars = bathDetailed.bathers.map((bather: IBather) => bather.avatar);
  const cachedBathersAvatars: IPersistImage[] = yield cacheImages(bathersAvatars, set, 100);

  const imagesForPersist = [...cachedbathImages, ...cachedBathersAvatars];

  for (let i = 0; i < imagesForPersist.length; i++) {
    yield put(persistImage(imagesForPersist[i]));
  }
}

export default function* listener() {
  yield takeEvery(GET_BATH, getBathSaga);
}
