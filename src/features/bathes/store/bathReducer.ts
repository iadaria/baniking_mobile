import { IErrors } from '~/src/app/utils/error';
import {
  IBath,
  TPartBathParams,
  defaultBathParams,
  EBathSort,
  FILTER_KEYS,
  IBathParamsVariety,
  IMap,
  IBathDetailed,
} from '~/src/app/models/bath';
import * as constants from './bathConstants';
import { defaultOrderCallInputs, IOrderCallInputs } from '../contracts/orderCallInputs';
import { initInputs } from '~/src/app/utils/validate';

// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IBathState {
  // Common
  loading: boolean;
  loadingSelectBath: boolean;
  errors: IErrors | null;
  // Bathes
  totalBathes: number;
  bathes: IBath[];
  bathIds: number[];
  oldBathes: IBath[];
  // Srot & Filter
  moreBathes: boolean;
  sort: EBathSort;
  retainState: boolean;
  params: TPartBathParams;
  paramsVariety: IBathParamsVariety | null;
  filtered: boolean;
  filterLoading: boolean;
  filterErrors: IErrors | null;
  filterCount: number;
  totalFilteredBathes: number;
  //filterParams: TPartBathParams;
  // Bathes detailded
  bathesDetailed: IBathDetailed[];
  bathesDetailedIds: number[];
  selectedBath: IBathDetailed | null;
  // Comments
  comments: string[];
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
  moreBathes: false,
  sort: EBathSort.None,
  retainState: false,
  params: defaultBathParams,
  paramsVariety: null,
  filtered: false,
  filterLoading: false,
  filterErrors: null,
  filterCount: 0,
  totalFilteredBathes: 0,
  //filterParams: defaultBathParams,
  // comments
  comments: [],
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
    // Bathes
    case constants.SET_BATHES:
      const newBathes: IBath[] = payload.bathes.filter((bath: IBath) => state.bathIds.indexOf(bath.id) === -1);
      return {
        ...state,
        loading: false,
        errors: null,
        totalBathes: payload.count,
        // bathes: [...state.bathes, ...payload.bathes],
        bathIds: [...state.bathIds, ...newBathes.map((bath: IBath) => bath.id)],
        bathes: [...state.bathes, ...newBathes],
        params: { ...state.params, page: payload.page },
      };

    case constants.FETCH_BATHES:
      return {
        ...state,
        loading: true,
        params: payload.bathParams,
        // bathes: [...state.bathes, ...payload.bathes],
        moreBathes: payload.moreBathes,
      };

    case constants.UPDATE_BATH:
      return {
        ...state,
        bathes: [...state.bathes.filter((bath: IBath) => bath.id !== payload.id), payload],
      };

    case constants.REUSE_BATHES:
      return {
        ...state,
        bathes: state.oldBathes,
      };

    case constants.CLEAR_BATHS:
      return {
        ...state,
        bathIds: [],
        bathes: [],
        oldBathes: state.bathes,
        moreBathes: true,
      };

    case constants.GET_BATHES:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    // Filter & Sort
    case constants.CHECK_FILTER:
      return {
        ...state,
        filterLoading: true,
        filterErrors: null,
        //filterParams: payload.params,
        //countFilters: payload.countFilters,
      };

    case constants.ACCEPT_FILTER:
      return {
        ...state,
        params: { ...state.params, ...payload.params },
        filterCount: payload.count,
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
        totalFilteredBathes: payload.count,
        //filterParams: payload.params,
      };

    case constants.SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreBathes: true, // ?
        filtered: Object.keys(payload.params).some((key: string) => FILTER_KEYS.includes(key)),
        params: { ...payload.params, page: 0 },
      };

    case constants.SET_SORT:
      return {
        ...state,
        retainState: false,
        moreBathes: true,
        sort: payload.sort,
        params: { ...payload.params, page: 0 },
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
        bathesDetailedIds: isNew ? [...state.bathesDetailedIds, payload.id] : [...state.bathesDetailedIds],
        bathesDetailed: isNew ? [...state.bathesDetailed, payload] : [...state.bathesDetailed],
        selectedBath: payload,
      };

    case constants.CLEAR_SELECTED_BATH:
      return {
        ...state,
        selectedBath: null,
      };

    // Comments
    case constants.FETCH_BATH_COMMENTS:
      return {
        ...state,
        comments: payload,
      };

    case constants.CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };

    // Common
    case constants.BATHES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    // Maps
    case constants.SET_MAPS:
      const newMaps: IMap[] = payload.filter((map: IMap) => state.mapIds.indexOf(map.bathId) === -1);
      return {
        ...state,
        mapIds: [...state.mapIds, ...newMaps.map((map: IMap) => map.bathId)],
        maps: [...state.maps, ...newMaps],
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
