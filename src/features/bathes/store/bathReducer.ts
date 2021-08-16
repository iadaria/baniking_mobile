import { IErrors } from '~/src/app/utils/error';
import { Bath, IMap, IBathDetailed } from '~/src/app/models/bath';
import * as constants from './bathConstants';
import {
  defaultOrderCallInputs,
  IOrderCallInputs,
} from '../contracts/orderCallInputs';
import { initInputs } from '~/src/app/utils/validate';
// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IBathState {
  // Common
  loading: boolean;
  loadingSelectBath: boolean;
  errors: IErrors | null;
  // Bathes
  totalBathes: number;
  bathes: Bath[];
  bathIds: number[];
  oldBathes: Bath[];
  // Bathes detailded
  canLoadMoreBathes: boolean;
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
  canLoadMoreBathes: true,
  totalBathes: 0,
  bathes: [],
  bathIds: [],
  oldBathes: [],
  // bathes detailed
  bathesDetailed: [],
  bathesDetailedIds: [],
  selectedBath: null,
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

    case constants.CLEAR_BATHS: // using
      return {
        ...state,
        bathIds: [],
        bathes: [],
        oldBathes: state.bathes,
      };

    // *******************************************

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

    case constants.INIT_ORDER_CALL_INPUTS:
      return {
        ...state,
        inputs: {
          orderCall: { ...initInputs(state.inputs.orderCall, payload) },
        },
      };

    case constants.REUSE_BATHES:
      return {
        ...state,
        bathes: state.oldBathes,
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

    /************* Maps ******************/

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

    default:
      return state;
  }
}
