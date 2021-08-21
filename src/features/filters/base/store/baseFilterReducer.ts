import { compareObj } from '~/src/app/utils/common';
import {
  BathSort,
  bathSortParams,
  IBathBaseParams,
  IBathExtraParams,
  IBathLocationParams,
} from '~/src/app/models/filter';
import { FieldMain } from '~/src/app/models/filter';
import * as constants from './baseFilterConstants';
import { BathMainParams } from '~/src/app/models/filter';
import { logline } from '~/src/app/utils/debug';

export interface IBaseFilterState {
  sort: BathSort;
  params: Partial<IBathBaseParams> & { page: number };
  extraParams?: Partial<IBathExtraParams>;
  locationParams?: Partial<IBathLocationParams>;
}

const initState: IBaseFilterState = {
  sort: BathSort.None,
  params: { page: 1 },
};

export default function baseFilterReducer(
  state = initState,
  { type, payload }: any = { type: '', payload: undefined },
): IBaseFilterState {
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
    /*     case constants.CHANGE_PARAM:
      logline('[base] CHANGE_PARAM', payload);
      const { field, value }: BathMainParam = payload;
      let mainParams = { ...state.params, [field]: value, page: 1 };
      if (!value) {
        delete mainParams[field];
      }
      return {
        ...state,
        params: mainParams,
      }; */

    case constants.CHANGE_PARAMS:
      logline('[base] CHANGE_PARAMS', { payload });
      const sort: BathSort = bathSortParams.indexOf(payload.params);
      const { params, isDelete }: BathMainParams = payload;
      let changedParams = { ...state.params, ...params, page: 1 };
      const fields = Object.keys(params) as FieldMain[];
      fields.forEach((f) => {
        if (!params[f] || isDelete) {
          delete changedParams[f];
        }
      });
      logline('[base] CHANGE_PARAMS', { changed: changedParams });
      return {
        ...state,
        sort,
        params: changedParams,
      };
    // SOrt
    case constants.SET_SORT:
      logline('[base] SET_SORT', payload);
      return {
        ...state,
        sort: payload,
      };

    default:
      return state;
  }
}
