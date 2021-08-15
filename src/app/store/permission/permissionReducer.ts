import { logline } from '../../utils/debug';
import * as constants from './permissionConstants';

//export type TPermission = [boolean, typeof RESULTS | ''];
export type Permit =
  | 'unavailable'
  | 'blocked'
  | 'denied'
  | 'granted'
  | 'limited'
  | '';
export type TPermission = [boolean, ''];

export interface IPermissionState {
  location: [boolean, Permit];
}

const initialState: IPermissionState = {
  location: [false, ''],
};

export default function permissionReducer(
  state: IPermissionState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IPermissionState {
  switch (type) {
    case constants.SET_LOCATION_PERMISSION:
      logline('SET_LOCATION_PERMISSION', payload);
      return {
        ...state,
        location: payload,
      };

    case constants.CLEAR_PERMISSION_LOCATION:
      logline('CLEAR_PERMISSION_LOCATION', '');
      return {
        ...state,
        location: [false, ''],
      };

    default:
      return state;
  }
}
