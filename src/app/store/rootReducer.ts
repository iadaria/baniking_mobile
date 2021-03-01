import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import systemReducer, { ISystemState } from './system/systemReducer';
import authReducer, { IAuthState } from '~/src/features/auth/store/authReducer';
import profileReducer, { IProfileState } from '~/src/features/profiles/store/profileReducer';
import appPersistReducer, { IPersistState } from '~/src/features/persist/store/appPersistReducer';
import settingsReducer, { ISettingsState } from '../../features/settings/store/settingsReducer';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

const persistConfig = {
  key: 'persist',
  storage: AsyncStorage,
};

export interface IRootState {
  system: ISystemState;
  auth: IAuthState;
  persist: IPersistState; // & PersistPartial;
  profile: IProfileState;
  settings: ISettingsState;
}

const rootReducer = combineReducers<IRootState>({
  system: systemReducer,
  auth: authReducer,
  profile: profileReducer,
  settings: settingsReducer,
  persist: persistReducer(persistConfig, appPersistReducer),
});

// Middleware: Redux Persist Persisted Reducer
// export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default rootReducer;
