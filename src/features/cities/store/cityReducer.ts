import { City } from '~/src/app/models/city';
import { logline } from '~/src/app/utils/debug';
import { IErrors } from '~/src/app/utils/error';
import * as constants from './cityConstants';

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

    case constants.CITIES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case constants.SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: payload,
      };

    case constants.UNSELECT_CITY:
      return {
        ...state,
        //selectedCityId: payload,
        selectedCity: undefined,
      };

    default:
      return state;
  }
}
/* case constants.SELECT_CITY:
        const selectedCity = state.cities.find(({ id, name }) =>
          [id, name].includes(payload),
        );
        return {
          ...state,
          selectedCityId: selectedCity?.id,
          selectedCity: selectedCity,
        }; */
