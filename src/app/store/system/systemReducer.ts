/***************** System constants ********************/
const OPEN_DRAWER = 'system/OPEN_DRAWER';
const CLOSE_DRAWER = 'system/CLOSE_DRAWER';
const ENABLE_BACKWARD = 'system/ENABLE_BACKWARD';
const DISABLE_BACKWARD = 'system/DISABLE_BACKWARD';

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

export function enableBackward() {
  return {
    type: ENABLE_BACKWARD,
  };
}

export function disableBackward() {
  return {
    type: DISABLE_BACKWARD,
  };
}

/***************** System reducer **********************/
export interface ISystemState {
  header: {
    isDrawerOpen: boolean;
    isBackward: boolean;
  };
}

const initialState: ISystemState = {
  header: {
    isDrawerOpen: false,
    isBackward: false,
  },
};

export default function systemReducer(
  state: ISystemState = initialState,
  { type }: IAction = { type: '' },
): ISystemState {
  switch (type) {
    case OPEN_DRAWER:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: true,
          isBackward: false,
        },
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: false,
        },
      };

    case ENABLE_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: true,
        },
      };

    case DISABLE_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          // isDrawerOpen: false,
          isBackward: false,
        },
      };

    default:
      return state;
  }
}
