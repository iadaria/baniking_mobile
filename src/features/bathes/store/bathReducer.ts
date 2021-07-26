import { IErrors } from '~/src/app/utils/error';
import {
  Bath,
  BathParams,
  BathSort,
  FILTER_KEYS,
  IBathParamsVariety,
  IMap,
  IBathDetailed,
} from '~/src/app/models/bath';
import * as constants from './bathConstants';
import {
  defaultOrderCallInputs,
  IOrderCallInputs,
} from '../contracts/orderCallInputs';
import { initInputs } from '~/src/app/utils/validate';
import { logline } from '~/src/app/utils/debug';
import { bathSortParams } from '../../../app/models/bath';

// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IBathState {
  // Common
  loading: boolean;
  loadingSelectBath: boolean;
  errors: IErrors | null;
  // Bathes
  params: BathParams;
  totalBathes: number;
  bathes: Bath[];
  bathIds: number[];
  oldBathes: Bath[];
  // Srot & Filter
  canLoadMoreBathes: boolean;
  sort: BathSort;
  retainState: boolean;
  paramsVariety: IBathParamsVariety | null;
  filtered: boolean;
  filterLoading: boolean;
  filterErrors: IErrors | null;
  filterCount: number;
  totalFilteredBathes: number;
  // Bathes detailded
  bathesDetailed: IBathDetailed[];
  bathesDetailedIds: number[];
  selectedBath: IBathDetailed | null;
  // Maps
  mapIds: number[];
  maps: IMap[];

  inputs: IInputs;
}

interface IInputs {
  orderCall: IOrderCallInputs;
}

const initialState: IBathState = {
  // common
  loading: false,
  loadingSelectBath: false,
  errors: null,
  // bathes
  totalBathes: 0,
  bathes: [],
  bathIds: [],
  oldBathes: [],
  // bathes detailed
  bathesDetailed: [],
  bathesDetailedIds: [],
  selectedBath: null,
  // fetch
  params: { page: 1 },
  canLoadMoreBathes: false,
  sort: BathSort.None,
  retainState: false,
  paramsVariety: null,
  filtered: false,
  filterLoading: false,
  filterErrors: null,
  filterCount: 0,
  totalFilteredBathes: 0,
  // maps
  mapIds: [],
  maps: [],

  inputs: {
    orderCall: defaultOrderCallInputs,
  },
};

export default function bathReducer(
  state = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IBathState {
  switch (type) {
    // Params
    case constants.SET_PARAMS: // using
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
    // Bathes
    case constants.SET_BATHES:
      const newBathes: Bath[] = payload.bathes.filter(
        (bath: Bath) => !state.bathIds.includes(bath.id),
      );
      const newBathIds = newBathes.map((bath: Bath) => bath.id);
      return {
        ...state,
        loading: false,
        errors: null,
        bathIds: [...state.bathIds, ...newBathIds],
        bathes: [...state.bathes, ...newBathes],
        params: { ...state.params, page: payload.page },
      };

    case constants.SET_BATHES_COUNT: // using
      return {
        ...state,
        totalBathes: payload,
        canLoadMoreBathes: payload > state.bathIds.length,
      };

    case constants.ADD_BATHES: // using
      const addingBathes: Bath[] = payload.filter(
        (bath: Bath) => !state.bathIds.includes(bath.id),
      );
      const addingBathIds = addingBathes.map((bath: Bath) => bath.id);
      return {
        ...state,
        loading: false,
        errors: null,
        bathIds: [...state.bathIds, ...addingBathIds],
        bathes: [...state.bathes, ...addingBathes],
      };

    case constants.FETCH_BATHES: //using
      return {
        ...state,
        loading: true,
      };

    case constants.REUSE_BATHES:
      return {
        ...state,
        bathes: state.oldBathes,
      };

    case constants.CLEAR_BATHS: // using
      return {
        ...state,
        bathIds: [],
        bathes: [],
        oldBathes: state.bathes,
      };

    case constants.UPDATE_BATH:
      return {
        ...state,
        bathes: [
          ...state.bathes.filter((bath: Bath) => bath.id !== payload.id),
          payload,
        ],
      };

    case constants.GET_BATHES:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case constants.BATHES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    // Filter & Sort
    case constants.CHECK_FILTER:
      return {
        ...state,
        filterLoading: true,
        filterErrors: null,
      };

    case constants.ACCEPT_FILTER:
      const { params } = state;
      const { filterParams } = payload;
      const newParams = { ...params, ...filterParams };
      if (
        !filterParams.hasOwnProperty('price_from') &&
        params.hasOwnProperty('price_from')
      ) {
        delete newParams.price_from;
      }
      if (
        !filterParams.hasOwnProperty('price_to') &&
        params.hasOwnProperty('price_to')
      ) {
        delete newParams.price_to;
      }
      if (
        !filterParams.hasOwnProperty('rating') &&
        params.hasOwnProperty('rating')
      ) {
        delete newParams.rating;
      }
      return {
        ...state,
        params: { ...newParams },
        filterCount: payload.filterCount,
      };

    case constants.CHECK_FILTER_FAIL:
      return {
        ...state,
        filterLoading: false,
        filterErrors: payload,
      };

    case constants.SET_CHECK_FILTER_RESULT:
      return {
        ...state,
        filterLoading: false,
        filterErrors: null,
        totalFilteredBathes: payload.bathCount,
        //filterParams: payload.params,
      };

    case constants.SET_FILTER:
      return {
        ...state,
        retainState: false,
        filtered: Object.keys(payload.params).some((key: string) =>
          FILTER_KEYS.includes(key),
        ),
        params: { ...payload.params, page: 0 },
      };

    /** Sorting
     * sort_filed in 'price' | 'rating'
     * sort_type in 'asc' | 'desc'
     */

    case constants.SET_SORT: // using
      const newSortParams = bathSortParams[payload];
      return {
        ...state,
        sort: payload,
        params: { ...newSortParams, page: 1 },
      };

    case constants.RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };

    case constants.SET_BATH_PARAMS_VARIETY:
      return {
        ...state,
        paramsVariety: payload,
      };

    // Bath
    case constants.GET_BATH:
      return {
        ...state,
        loadingSelectBath: true,
        errors: null,
      };

    case constants.SELECT_BATH:
      const isNew = state.bathesDetailedIds.indexOf(payload.id) === -1;
      return {
        ...state,
        loadingSelectBath: false,
        errors: null,
        bathesDetailedIds: isNew
          ? [...state.bathesDetailedIds, payload.id]
          : [...state.bathesDetailedIds],
        bathesDetailed: isNew
          ? [...state.bathesDetailed, payload]
          : [...state.bathesDetailed],
        selectedBath: payload,
      };

    case constants.CLEAR_SELECTED_BATH:
      return {
        ...state,
        selectedBath: null,
      };

    // Maps
    case constants.SET_MAPS:
      const newMapIds = payload.map((map: IMap) => map.bathId);
      const oldMapsWithoutNew = state.maps.filter(
        (map: IMap) => !newMapIds.includes(map.bathId),
      );
      return {
        ...state,
        mapIds: [
          ...oldMapsWithoutNew.map((map: IMap) => map.bathId),
          ...newMapIds,
        ],
        maps: [...oldMapsWithoutNew, ...payload],
      };

    case constants.ADD_MAP:
      const exists = state.mapIds.includes(payload.bathId);
      return {
        ...state,
        mapIds: !exists ? [...state.mapIds, payload.bathId] : state.mapIds,
        maps: !exists ? [...state.maps, payload] : state.maps,
      };

    case constants.CLEAR_MAPS:
      return {
        ...state,
        maps: [],
      };

    case constants.INIT_ORDER_CALL_INPUTS:
      return {
        ...state,
        inputs: {
          orderCall: { ...initInputs(state.inputs.orderCall, payload) },
        },
      };

    default:
      return state;
  }
}
