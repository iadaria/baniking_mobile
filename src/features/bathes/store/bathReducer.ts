import { IErrors } from '~/src/app/utils/error';
import { IBath, TPartBathParams, defaultBathParams, EBathSort } from '~/src/app/models/bath';
import * as constants from './bathConstants';

// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IBathState {
  // common
  loading: boolean;
  errors: IErrors | null;
  // bathes
  totalBathes: number;
  bathes: IBath[];
  selectedBath: IBath | null;
  // filter
  // lastPage: number;
  moreBathes: boolean;
  sort: EBathSort;
  params: TPartBathParams;
  filter: TPartBathParams;
  retainState: boolean;
  // comments
  comments: string[];
}

const initialState: IBathState = {
  // common
  loading: false,
  errors: null,
  // bathes
  totalBathes: 0,
  bathes: [],
  selectedBath: null,
  // fetch
  moreBathes: false,
  // lastPage: 0,
  sort: EBathSort.None,
  params: defaultBathParams,
  filter: defaultBathParams,
  retainState: false,
  // comments
  comments: [],
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
        filter: { ...state.filter, page: payload.page },
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
        // lastPage: payload.lastPage,
      };

    case constants.UPDATE_BATH:
      return {
        ...state,
        bathes: [...state.bathes.filter((bath: IBath) => bath.id !== payload.id), payload],
      };

    case constants.CLEAR_BATHS:
      return {
        ...state,
        bathes: [],
        moreBathes: true,
      };

    // Filter & Sort
    case constants.SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreBathes: true,
        filter: { ...payload, page: 0 },
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

    default:
      return state;
  }
}
