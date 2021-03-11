import { IErrors } from '~/src/app/utils/error';
import { IBath } from '~/src/app/models/bath';
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
  lastPage: number;
  moreBathes: boolean;
  filter: string;
  retainState: boolean;
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
  lastPage: -1,
  filter: 'all',
  retainState: false,
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
        // bathes: [...state.bathes, ...payload.bathes],
        moreBathes: payload.moreBathes,
        lastPage: payload.lastPage,
      };

    // Filter
    case constants.RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };

    default:
      return state;
  }
}
