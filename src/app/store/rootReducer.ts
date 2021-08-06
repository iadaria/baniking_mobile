import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/es/storage';
import systemReducer, { ISystemState } from './system/systemReducer';
import authReducer, { IAuthState } from '~/src/features/auth/store/authReducer';
import profileReducer, {
  IProfileState,
} from '~/src/features/profiles/store/profileReducer';
import appPersistReducer, {
  IPersistState,
} from '~/src/features/persist/store/appPersistReducer';
import settingsReducer, {
  ISettingsState,
} from '~/src/features/settings/store/settingsReducer';
import bathReducer, {
  IBathState,
} from '~/src/features/bathes/store/bathReducer';
import modalReducer, {
  IModalState,
} from '~/src/app/common/modals/modalReducer';
import cityReducer, {
  ICityState,
} from '~/src/features/cities/store/cityReducer';
import { PersistConfig, persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig: PersistConfig<T> = {
  key: 'persist',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  // storage,
};

export interface IRootState {
  auth: IAuthState;
  system: ISystemState;
  modal: IModalState;
  profile: IProfileState;
  settings: ISettingsState;
  bath: IBathState;
  city: ICityState;
  persist: IPersistState & PersistPartial;
}

const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  system: systemReducer,
  modal: modalReducer,
  profile: profileReducer,
  settings: settingsReducer,
  bath: bathReducer,
  city: cityReducer,
  persist: persistReducer(persistConfig, appPersistReducer),
});

// Middleware: Redux Persist Persisted Reducer
// export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default rootReducer;
