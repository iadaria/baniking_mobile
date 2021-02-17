import { combineReducers } from 'redux';
import systemReducer, { ISystemState } from './system/systemReducer';
import authReducer, { IAuthState } from '~/src/features/auth/store/authReducer';
import profileReducer, { IProfileState } from '~/src/features/profiles/store/profileReducer';
import appPersistReducer, { IPersistState } from '~/src/features/persist/store/appPersistReducer';
// import persistReducer, { PersistPartial } from 'redux-persist/es/persistReducer';
//import { appPersistReducer, IPersistState } from '~/src/features/persist/store/appPersistReducer';
//import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface IRootState {
  system: ISystemState;
  auth: IAuthState;
  persist: IPersistState; // & PersistPartial;
  profile: IProfileState;
}

const rootReducer = combineReducers<IRootState>({
  system: systemReducer,
  auth: authReducer,
  profile: profileReducer,
  persist: appPersistReducer,
  // persist: persistReducer(persistConfig, appPersistReducer),
});

// Middleware: Redux Persist Persisted Reducer
// export const persistedReducer = persistReducer(persistConfig, rootReducer);
export default rootReducer;
