import * as constants from './cityConstants';
import { City } from '~/src/app/models/city';
import { IErrors } from '~/src/app/utils/error';
import { logline } from '~/src/app/utils/debug';

export interface ICityState {
  loading: boolean;
  errors: IErrors | null;

  count: number;
  cities: City[];
  selectedCity?: City;
}

const initState: ICityState = {
  loading: false,
  errors: null,

  count: 0,
  cities: [],
};

export default function cityReducer(
  state = initState,
  { type, payload }: any = { type: '', paylaod: undefined },
): ICityState {
  switch (type) {
    case constants.FETCH_CITIES:
      return {
        ...state,
        loading: true,
      };

    case constants.CITIES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case constants.SET_CITIES:
      const sortAsc = (a: City, b: City) =>
        a.name < b.name ? -1 : Number(a.name > b.name);
      return {
        ...state,
        count: payload.length,
        loading: false,
        cities: payload
          .map((city: City) => ({ ...city, name: city.name.toLowerCase() }))
          .sort(sortAsc),
      };

    case constants.SELECT_CITY:
      logline('[city/SELECT_CITY]', payload, '\n');
      const selectedCity = state.cities.find(({ id, name }) =>
        [id, name].includes(payload),
      );
      return {
        ...state,
        selectedCity,
      };

    /*     case constants.SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: payload,
      };

    case constants.UNSELECT_CITY:
      return {
        ...state,
        selectedCity: undefined,
      }; */

    default:
      return state;
  }
}
