import { IErrors } from '~/src/app/utils/error';
import { IBath, TPartBathParams, defaultBathParams, EBathSort, FILTER_KEYS } from '~/src/app/models/bath';
import * as constants from './bathConstants';
import { IMap } from '../../../app/models/bath';

// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IBathState {
  // Common
  loading: boolean;
  errors: IErrors | null;
  // Bathes
  totalBathes: number;
  bathes: IBath[];
  oldBathes: IBath[];
  selectedBath: IBath | null;
  // Srot & Filter
  moreBathes: boolean;
  sort: EBathSort;
  filtered: boolean;
  params: TPartBathParams;
  retainState: boolean;
  // Comments
  comments: string[];
  // Maps
  maps: IMap[];
}

const initialState: IBathState = {
  // common
  loading: false,
  errors: null,
  // bathes
  totalBathes: 0,
  bathes: [],
  oldBathes: [],
  selectedBath: null,
  // fetch
  moreBathes: false,
  sort: EBathSort.None,
  filtered: false,
  params: defaultBathParams,
  retainState: false,
  // comments
  comments: [],
  // maps
  maps: [],
};

export default function bathReducer(
  state = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): IBathState {
  switch (type) {
    // Common
    // Bathes
    case constants.SET_BATHES:
      return {
        ...state,
        loading: false,
        errors: null,
        totalBathes: payload.count,
        bathes: [...state.bathes, ...payload.bathes],
        params: { ...state.params, page: payload.page },
      };

    case constants.GET_BATHES:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case constants.FETCH_BATHES:
      return {
        ...state,
        loading: true,
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
        bathes: [],
        oldBathes: state.bathes,
        moreBathes: true,
      };

    // Filter & Sort
    case constants.SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreBathes: true,
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

    // Bath
    case constants.SELECT_BATH:
      return {
        ...state,
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
      return {
        ...state,
        maps: [...state.maps, ...payload],
      };

    case constants.CLEAR_MAPS:
      return {
        ...state,
        maps: [],
      };

    default:
      return state;
  }
}
