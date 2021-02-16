import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import systemReducer, { ISystemState } from './system/systemReducer';
import authReducer, { IAuthState } from '~/src/features/auth/store/authReducer';
import profileReducer, { IProfileState } from '~/src/features/profiles/store/profileReducer';
import { default as appPersistrReducer, IPersistState } from '~/src/features/persist/store/persistReducer';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export interface IRootState {
  system: ISystemState;
  auth: IAuthState;
  persist: IPersistState & PersistPartial;
  // persist: any;
  profile: IProfileState;
}

const rootReducer = combineReducers<IRootState>({
  system: systemReducer,
  auth: authReducer,
  profile: profileReducer,
  persist: persistReducer(persistConfig, appPersistrReducer),
});

export default rootReducer;
