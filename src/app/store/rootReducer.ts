import { combineReducers } from 'redux';
import systemReducer, { ISystemState } from './system/systemReducer';
import authReducer, { IAuthState } from '~/src/features/auth/authReducer';

export interface IRootState {
  system: ISystemState;
  auth: IAuthState;
}

const rootReducer = combineReducers<IRootState>({
  system: systemReducer,
  auth: authReducer,
});

export default rootReducer;
