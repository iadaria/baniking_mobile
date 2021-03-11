import { IErrors } from '~/src/app/utils/error';
import { IBath } from '~/src/app/models/bath';
import * as constants from './bathConstants';

// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IBathState {
  // common
  loading: boolean;
  errors: IErrors | null;
  // bathes
  bathes: IBath[];
  selectedBath: IBath | null;
  // filter
  lastVisible: IBath | null;
  filter: string;
  retainState: boolean;
}

const initialState: IBathState = {
  // common
  loading: false,
  errors: null,
  // bathes
  bathes: [],
  selectedBath: null,
  // filter
  lastVisible: null,
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
        bathes: [...state.bathes, ...payload],
      };

    case constants.GET_BATHES:
      return {
        ...state,
        loading: true,
        errors: null,
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
