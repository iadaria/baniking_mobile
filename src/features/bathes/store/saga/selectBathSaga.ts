import { routes } from '~/src/navigation/helpers/routes';
import { setSelectedBath } from '../bathActions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { getErrorStrings } from '~/src/app/utils/error';
import { bathesFail } from '../bathActions';
import { SELECT_BATH } from '../bathConstants';
import { IBathDetailed, IProposition, ISchedule } from '~/src/app/models/bath';
import { methods } from '~/src/app/api';
import { cacheImages } from '~/src/app/utils/bathUtility';
import { persistImage } from '~/src/features/persist/store/appPersistActions';
import { IBather } from '~/src/app/models/bath';
import { IPersistImage } from '~/src/app/models/persist';
import { IBathState } from '../bathReducer';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { log } from '~/src/app/utils/debug';

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

function* selectBathSaga({ payload: bathId }: IAction) {
  log('\n\n***[selectBathSaga]', bathId);

  let gotBath;
  try {
    const bath: IBathState = yield select((state: IRootState) => state.bath);
    const foundBath = bath.bathesDetailed.find((b) => b.id === bathId);

    if (foundBath) {
      log('[getBathSaga found]', { foundBath });
      yield put(setSelectedBath(foundBath));
      gotBath = foundBath;
    } else {
      const response: IResult = yield call(methods.getBath, null, bathId);
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
      gotBath = bathDetailed;
    }
    yield put(setSelectedBath(gotBath));
    RootNavigation.navigate(routes.bathesTab.BathScreen);
    //yield fork(cacheImageBathSaga, bathDetailed);
  } catch (e) {
    const [errors, message, allErrors] = getErrorStrings(e);
    let errorMessage =
      allErrors || message || 'Ошибка при получении инф. о бане';

    yield put(bathesFail(errors));

    yield showAlert('Ошибка', errorMessage);
  }
}

// Меняем размер и кэшируем изображения бань и банщиков
function* cacheImageBathSaga(bathDetailed: IBathDetailed) {
  const set: string[] = yield select(
    (state: IRootState) => state.persist.image.set,
  );

  //const bathImages = [/* bathDetailed.image,  */ ...bathDetailed.photos];
  const cachedMainImages: IPersistImage[] = yield cacheImages(
    [bathDetailed.image],
    set,
    700,
  );
  const cachedbathImages: IPersistImage[] = yield cacheImages(
    bathDetailed.photos,
    set,
    500,
  );

  const bathersAvatars = bathDetailed.bathers.map(
    (bather: IBather) => bather.avatar,
  );
  const cachedBathersAvatars: IPersistImage[] = yield cacheImages(
    bathersAvatars,
    set,
    100,
  );

  const imagesForPersist = [
    ...cachedMainImages,
    ...cachedbathImages,
    ...cachedBathersAvatars,
  ];

  for (let i = 0; i < imagesForPersist.length; i++) {
    yield put(persistImage(imagesForPersist[i]));
  }
}

export default function* listener() {
  yield takeEvery(SELECT_BATH, selectBathSaga);
}
