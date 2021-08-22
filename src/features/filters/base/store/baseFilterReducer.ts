import {
  BathSort,
  bathSortParams,
  IBathBaseParams,
  IBathExtraParams,
  IBathGeoParams,
} from '~/src/app/models/filter';
import { FieldMain } from '~/src/app/models/filter';
import * as constants from './baseFilterConstants';
import { BathMainParams } from '~/src/app/models/filter';
import { logline } from '~/src/app/utils/debug';

export interface IBaseFilterState {
  sort: BathSort;
  params: Partial<IBathBaseParams> & { page: number };
  extraParams?: Partial<IBathExtraParams>;
  geoParams?: Partial<IBathGeoParams>;
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
    case constants.CHANGE_PARAMS:
      const { prop, params, isDelete }: BathMainParams = payload;
      logline('[baseFilter/CHANGE_PARAMS]', { payload }, '\n');

      const sort = bathSortParams.indexOf(params);
      let changedParams = { ...state.params, ...params, page: 1 };
      const fields = Object.keys(params) as FieldMain[];
      fields.forEach((f) => {
        if (!params[f] || isDelete) {
          delete changedParams[f];
        }
      });
      return {
        ...state,
        sort: sort !== -1 ? sort : state.sort,
        [prop]: changedParams,
      };

    default:
      return state;
  }
}
