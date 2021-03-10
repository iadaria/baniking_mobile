import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import systemReducer, { ISystemState } from './system/systemReducer';
import authReducer, { IAuthState } from '~/src/features/auth/store/authReducer';
import profileReducer, { IProfileState } from '~/src/features/profiles/store/profileReducer';
import appPersistReducer, { IPersistState } from '~/src/features/persist/store/appPersistReducer';
import settingsReducer, { ISettingsState } from '~/src/features/settings/store/settingsReducer';
import bathReducer, { IBathState } from '~/src/features/bathes/store/bathReducer';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

const persistConfig = {
  key: 'persist',
  storage: AsyncStorage,
};

export interface IRootState {
  system: ISystemState;
  auth: IAuthState;
  profile: IProfileState;
  settings: ISettingsState;
  bath: IBathState;
  persist: IPersistState & PersistPartial;
}

const rootReducer = combineReducers<IRootState>({
  system: systemReducer,
  auth: authReducer,
  profile: profileReducer,
  settings: settingsReducer,
  bath: bathReducer,
  persist: persistReducer(persistConfig, appPersistReducer),
});

// Middleware: Redux Persist Persisted Reducer
// export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default rootReducer;
