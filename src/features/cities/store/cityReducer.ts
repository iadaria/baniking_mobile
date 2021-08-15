import { City } from '~/src/app/models/city';
import { logline } from '~/src/app/utils/debug';
import { IErrors } from '~/src/app/utils/error';
import * as constants from './cityConstants';

const defaultCity: City = {
  id: 0,
  name: 'Москва',
};

export interface ICityState {
  loading: boolean;
  errors: IErrors | null;

  count: number;
  cities: City[];
  // select
  selectedBy: 'user' | 'auto';
  selectedCityId: number;
  selectedCity: City;
}

const initState: ICityState = {
  loading: false,
  errors: null,

  count: 0,
  cities: [],
  // select
  selectedBy: 'auto',
  selectedCityId: 0,
  selectedCity: defaultCity,
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

    case constants.SET_CITIES:
      const sortAsc = (a: City, b: City) =>
        a.name < b.name ? -1 : Number(a.name > b.name);
      return {
        ...state,
        count: payload.length,
        loading: false,
        cities: payload.sort(sortAsc),
      };

    case constants.CITIES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case constants.SELECT_CITY:
      const selectedCity = state.cities.find(({ id, name }) =>
        [id, name.toLowerCase()].includes(payload),
      );
      return {
        ...state,
        selectedBy: 'user',
        selectedCityId: selectedCity?.id || 0,
        selectedCity: selectedCity || defaultCity,
      };

    case constants.UNSELECT_CITY:
      return {
        ...state,
        selectedCityId: payload,
        selectedCity: defaultCity,
      };

    default:
      return state;
  }
}
