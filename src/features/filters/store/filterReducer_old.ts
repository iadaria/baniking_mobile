import { calcFilterCount } from '~/src/app/utils/bathUtility';
import { IErrors } from '~/src/app/utils/error';
import {
  BathParams,
  BathSort,
  FILTER_KEYS,
  BathTouchParams,
  BathParam,
  additionFilters,
} from '~/src/app/models/bath';
import * as constants from './filterConstants';
import { bathSortParams } from '~/src/app/models/bath';
import { logline } from '~/src/app/utils/debug';

// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IFilterState {
  // Common
  loading: boolean;
  errors: IErrors | null;
  // Filter
  params: BathParams;
  paramsTouchCount: number;
  canLoadMoreBathes: boolean;
  sort: BathSort;
  isNear?: boolean;
  // Filter
  paramsTouch: Partial<BathTouchParams>;
  paramsCheck: BathParams;
  filtered: boolean;
  filterLoading: boolean;
  filterErrors: IErrors | null;
  filterCount: number;
  totalCheckedBathes: number;
}

const initialState: IFilterState = {
  // common
  loading: false,
  errors: null,
  // Sort
  canLoadMoreBathes: false,
  paramsTouchCount: 0,
  params: { page: 1 },
  sort: BathSort.None,
  isNear: false,
  // Filter
  //paramsTouch: { types: [], zones: [], services: [], steamRooms: [] },
  paramsTouch: {},
  paramsCheck: { page: 0 },
  filtered: false,
  filterLoading: false,
  filterErrors: null,
  filterCount: 0,
  totalCheckedBathes: 0,
};

export default function filterReducer(
  state = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IFilterState {
  switch (type) {
    // Params
    case constants.SET_PARAMS: // using
      logline('SET_PARAMS', payload);
      return {
        ...state,
        params: payload,
      };

    case constants.NEXT_PAGE: // using
      return {
        ...state,
        params: {
          ...state.params,
          page: state.params.page + 1,
        },
      };
    case constants.SET_BATH_PARAM: // using
      logline('SET_BATH_PARAMS', payload);
      const { prop = 'params', field, value } = payload as BathParam;
      const newBathParams = {
        ...state[prop],
        [field]: value,
        page: 1,
      };
      if (!value) {
        delete newBathParams[field];
      }
      return {
        ...state,
        [prop]: newBathParams,
        filterCount: calcFilterCount(newBathParams),
      };

    case constants.SET_BATH_PARAMS_FILTERING: // using
      logline('SET_PARAMS_PARAMS_FILTERING', payload);
      return {
        ...state,
        paramsTouch: payload,
      };

    case constants.SET_SORT: // using
      const sortParams = {
        ...state.params,
        ...bathSortParams[payload],
        page: 1,
      };
      if (payload === BathSort.None) {
        delete sortParams.sort_field;
        delete sortParams.sort_type;
      }
      return {
        ...state,
        sort: payload,
        params: sortParams,
      };

    case constants.SET_NEAR: // using
      return {
        ...state,
        isNear: true,
      };

    case constants.SET_FILTER:
      return {
        ...state,
        filtered: Object.keys(payload.params).some((key: string) =>
          FILTER_KEYS.includes(key),
        ),
        params: { ...payload.params, page: 0 },
      };

    case constants.SET_CHECK_COUNT: // using
      return {
        ...state,
        filterLoading: false,
        filterErrors: null,
        totalCheckedBathes: payload,
      };

    case constants.CHECK_FILTER_FAIL: // using
      return {
        ...state,
        filterLoading: false,
        filterErrors: payload,
      };

    case constants.ACCEPT_FILTER: // using
      const cleanedParams: BathParams = { ...state.params, page: 0 };
      additionFilters.forEach((field: string) => {
        if (cleanedParams.hasOwnProperty(field)) {
          delete cleanedParams[field];
        }
      });
      return {
        ...state,
        paramsTouchCount: state.filterCount,
        params: { ...cleanedParams, ...state.paramsCheck },
      };

    case constants.NOT_NEAR: // using
      return {
        ...state,
        isNear: false,
      };

    case constants.CHECK_INIT: // using
      return {
        ...state,
        paramsCheck: { ...state.paramsCheck, ...state.params },
      };

    case constants.CHECK_FILTER: // using
      return {
        ...state,
        filterLoading: true,
        filterErrors: null,
      };

    case constants.CHECK_CLEAN: // using
      const checkCleanted: BathParams = { ...state.params, page: 0 };
      additionFilters.forEach((field: string) => {
        if (checkCleanted.hasOwnProperty(field)) {
          delete checkCleanted[field];
        }
      });

      return {
        ...state,
        filterCount: 0,
        paramsCheck: checkCleanted,
      };

    default:
      return state;
  }
}
