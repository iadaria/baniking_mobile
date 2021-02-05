import { IAction } from '~/app/models/common';

/***************** System constants ********************/
const OPEN_DRAWER = 'system/OPEN_DRAWER';
const CLOSE_DRAWER = 'system/CLOSE_DRAWER';

/***************** System actions **********************/
export function openModal() {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeModal() {
  return {
    type: CLOSE_DRAWER,
  };
}

/***************** System reducer **********************/
export interface ISystemState {
  isOpenDrawer: boolean;
}

const initialState: ISystemState = {
  isOpenDrawer: false,
};

export default function modalReducer(
  state: ISystemState = initialState,
  { type }: IAction = { type: '', payload: undefined },
): ISystemState {
  switch (type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isOpenDrawer: true,
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        isOpenDrawer: false,
      };

    default:
      return state;
  }
}
