import { calcFilterCount } from '~/src/app/utils/bathUtility';
import {
  BathSort,
  bathSortParams,
  IBathBaseParams,
  IBathExtraParams,
  TouchParams,
} from '~/src/app/models/filter';
import { FieldMain } from '~/src/app/models/filter';
import * as constants from './filterConstants';
import { BathMainParams } from '~/src/app/models/filter';
import { logline } from '~/src/app/utils/debug';

export interface IFilterState {
  sort: BathSort;
  params: Partial<IBathBaseParams> & { page: number };
  backupParams?: Partial<IBathBaseParams> & { page: number };
  // toching params
  touchedCount: number;
  touchParams: Partial<TouchParams>;
  // filter
  filterCount: number;
  // extra
  extraLoading: boolean;
  extraCount: number;
  extraParams?: Partial<IBathExtraParams>;
  isExtra: boolean;
}

const initState: IFilterState = {
  sort: BathSort.None,
  params: { page: 1 },
  // touching params
  touchedCount: 0,
  touchParams: {},
  // filter
  filterCount: 0,
  // extra
  extraLoading: false,
  extraCount: 0,
  isExtra: false,
};

export default function filterReducer(
  state = initState,
  { type, payload }: any = { type: '', payload: undefined },
): IFilterState {
  switch (type) {
    // Load more
    case constants.NEXT_PAGE:
      return {
        ...state,
        params: {
          ...state.params,
          page: state.params.page + 1,
        },
      };
    // Filter
    case constants.CHANGE_PARAMS:
      const { prop, params, isDelete }: BathMainParams = payload;
      logline('[filter/CHANGE_PARAMS]', { payload }, '\n');

      let sort = -1;
      if (params.hasOwnProperty('sort_field')) {
        sort = bathSortParams.indexOf(params);
      }

      let changedParams = { ...state[prop], ...params, page: 1 };
      const fields = Object.keys(params) as FieldMain[];
      fields.forEach((f) => {
        if (!params[f] || isDelete) {
          delete changedParams[f];
        }
      });

      let filterCount = state.filterCount;
      if (prop === 'extraParams') {
        filterCount = calcFilterCount(changedParams);
      }

      return {
        ...state,
        sort: sort !== -1 ? sort : state.sort,
        [prop]: changedParams,
        filterCount,
      };

    // Touching
    case constants.SET_TOUCH_PARAMS:
      return {
        ...state,
        touchParams: payload,
      };

    // Extra
    case constants.CHECK_EXTRA_FILTER:
      return {
        ...state,
        extraLoading: true,
      };

    case constants.SET_CHECKED_COUNT:
      return {
        ...state,
        extraLoading: false,
        extraCount: payload,
      };

    case constants.CHECK_EXTRA_FILTER_FAIL:
      return {
        ...state,
        extraLoading: false,
      };

    case constants.ACCEPT_EXTRA_PARAMS:
      return {
        ...state,
        backupParams: state.params,
        params: { ...state.params, ...state.extraParams },
        isExtra: true,
      };

    case constants.ROLLBACK_EXTRA_PARAMS:
      const rolledParams = state.isExtra ? state.backupParams! : state.params;
      return {
        ...state,
        params: { ...rolledParams, page: 1 },
        extraParams: undefined,
        backupParams: undefined,
        isExtra: false,
        filterCount: calcFilterCount(rolledParams),
      };

    case constants.CLEAN_EXTRA_PARAMS:
      return {
        ...state,
        extraParams: undefined,
        filterCount: 0,
      };

    default:
      return state;
  }
}
