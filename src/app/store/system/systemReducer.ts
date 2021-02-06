import { IAction } from '~/app/models/common';

/***************** System constants ********************/
const OPEN_DRAWER = 'system/OPEN_DRAWER';
const CLOSE_DRAWER = 'system/CLOSE_DRAWER';

/***************** System actions **********************/
export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}

/***************** System reducer **********************/
export interface ISystemState {
  isDrawerOpen: boolean;
}

const initialState: ISystemState = {
  isDrawerOpen: false,
};

export default function modalReducer(
  state: ISystemState = initialState,
  { type }: IAction = { type: '', payload: undefined },
): ISystemState {
  switch (type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpen: true,
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        isDrawerOpen: false,
      };

    default:
      return state;
  }
}
