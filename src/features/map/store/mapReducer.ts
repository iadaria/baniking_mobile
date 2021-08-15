import * as constants from './mapConstants';
import { Location } from '~/src/app/models/map';
import { log, logline } from '~/src/app/utils/debug';


export interface IMapState {
  loading: boolean;
  error: boolean;
  // city
  location: Location | null;
}

const initState: IMapState = {
  loading: false,
  error: false,
  // detect
  location: null,
};

export default function mapReducer(
  state = initState,
  { type, payload }: any = { type: '', payload: undefined },
): IMapState {
  switch (type) {
    case constants.MAP_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case constants.MAP_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case constants.SET_GEOLOCATION:
      logline('SET_GEOLOCATION', payload);
      return {
        ...state,
        loading: false,
        error: false,
        location: payload,
      };

    default:
      return state;
  }
}
