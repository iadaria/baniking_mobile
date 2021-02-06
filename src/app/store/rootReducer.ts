import { combineReducers } from 'redux';
import systemReducer, { ISystemState } from './system/systemReducer';

export interface IRootState {
  system: ISystemState;
}

const rootReducer = combineReducers<IRootState>({
  system: systemReducer,
});

export default rootReducer;
