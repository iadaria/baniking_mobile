/***************** System constants ********************/
const OPEN_DRAWER = 'system/OPEN_DRAWER';
const CLOSE_DRAWER = 'system/CLOSE_DRAWER';

/***************** System actions **********************/
interface IAction {
  type: string;
}

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
  isBackward: boolean;
}

const initialState: ISystemState = {
  isDrawerOpen: false,
  isBackward: false,
};

export default function systemReducer(
  state: ISystemState = initialState,
  { type }: IAction = { type: '' },
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
