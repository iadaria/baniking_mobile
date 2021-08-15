import { RESULTS } from 'react-native-permissions';
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
  locationGranted: boolean;
  locationPermit: Permit;
  location: [boolean, Permit];
}

const initialState: IPermissionState = {
  locationGranted: false,
  locationPermit: '',
  location: [false, ''],
};

export default function permissionReducer(
  state: IPermissionState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IPermissionState {
  switch (type) {
    /* case constants.SET_LOCATION_PERMISSION:
      const [granted, permit] = payload;
      return {
        ...state,
        locationGranted: granted,
        locationPermit: permit,
      };
       */
    case constants.SET_LOCATION_PERMISSION:
      //logline('[Reducer]', payload);
      return {
        ...state,
        location: payload,
      };
    /* case constants.DENY_LOCATION_PERMISSION:
      return {
        ...state,
        location: payload,
      };

    case constants.ACCEPT_LOCATION_PERMISSION:
      return {
        ...state,
        location: true,
      }; */

    default:
      return state;
  }
}
