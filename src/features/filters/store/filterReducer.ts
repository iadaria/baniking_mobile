import { calcFilterCount } from '~/src/app/utils/bathUtility';
import {
  BathSort,
  bathSortParams,
  EXTRA_KEYS,
  IBathBaseParams,
  IBathExtraParams,
  TouchParams,
} from '~/src/app/models/filter';
import { FieldMain } from '~/src/app/models/filter';
import * as constants from './filterConstants';
import { BathMainParams } from '~/src/app/models/filter';
import { logline } from '~/src/app/utils/debug';
import { isEmptyObj } from '~/src/app/utils/common';

export interface IFilterState {
  sort: BathSort;
  params: Partial<IBathBaseParams> & { page: number };
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

    case constants.CLEAN_PARAMS:
      return {
        ...state,
        params: { page: 1, city_id: state.params.city_id },
        filterCount: 0,
        isExtra: false,
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

    case constants.INIT_EXTRA_PARAMS:
      const initExtraParams = { ...state.params };
      Object.keys(state.params).map((key) => {
        if (!EXTRA_KEYS.includes(key)) {
          delete initExtraParams[key as keyof IBathBaseParams];
        }
      });
      const isInitExtra = !isEmptyObj(initExtraParams);
      logline('[filter/INIT_EXTRA_PARAMS]', { initExtraParams }, '\n');
      return {
        ...state,
        extraParams: isInitExtra ? initExtraParams : undefined,
        //filterCount: calcFilterCount(initExtraParams),
        isExtra: isInitExtra,
      };

    case constants.ACCEPT_EXTRA_PARAMS:
      return {
        ...state,
        params: { ...state.params, ...state.extraParams },
        isExtra: true,
      };

    case constants.ROLLBACK_EXTRA_PARAMS:
      const baseParams = { ...state.params };
      Object.keys(baseParams).map((key) => {
        if (EXTRA_KEYS.includes(key)) {
          delete baseParams[key as keyof IBathBaseParams];
        }
      });
      return {
        ...state,
        params: { ...baseParams, page: 1 },
        extraParams: undefined,
        isExtra: false,
        filterCount: 0,
      };

    case constants.CLEAN_EXTRA_PARAMS:
      return {
        ...state,
        extraParams: undefined,
        filterCount: state.isExtra ? state.filterCount : 0,
      };

    default:
      return state;
  }
}
