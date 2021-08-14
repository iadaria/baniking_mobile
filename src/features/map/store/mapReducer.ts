import * as constants from './mapConstants';

export interface IMapState {
  loading: boolean;
  error: boolean;

  detectedCity: string | null;
  lat: number | null;
  lng: number | null;
}

const initState: IMapState = {
  loading: false,
  error: false,
  // data
  detectedCity: null,
  lat: null,
  lng: null,
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
      return {
        ...state,
        lat: state.lat,
        lng: state.lng,
      };

    case constants.SET_DETECTED_CITY:
      return {
        ...state,
        loading: false,
        error: false,
        detectedCity: payload,
      };

    default:
      return state;
  }
}
