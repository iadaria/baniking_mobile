/***************** System constants ********************/
const OPEN_DRAWER = 'system/OPEN_DRAWER';
const CLOSE_DRAWER = 'system/CLOSE_DRAWER';
const ENABLE_BACKWARD = 'system/ENABLE_BACKWARD';
const DISABLE_BACKWARD = 'system/DISABLE_BACKWARD';
const PUSH_BACKWARD = 'system/PUSH_BACKWARD';
const PULL_BACKWARD = 'system/PULL_BACKWARD';
const CLEAR_BACKWARD = 'system/CLEAR_BACKWARD';

/***************** System actions **********************/
interface IAction {
  type: string;
  payload: any;
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

export function pushBackward(screen: string) {
  console.log('kljlkjlkj ', screen);
  return {
    type: PUSH_BACKWARD,
    payload: screen,
  };
}

export function pullBackward() {
  return {
    type: PULL_BACKWARD,
  };
}

export function clearBackward() {
  return {
    type: CLEAR_BACKWARD,
  };
}

/***************** System reducer **********************/
export interface ISystemState {
  header: {
    isDrawerOpen: boolean;
    isBackward: boolean;
    backwardStack: string[];
  };
}

const initialState: ISystemState = {
  header: {
    isDrawerOpen: false,
    isBackward: false,
    backwardStack: [],
  },
};

export default function systemReducer(
  state: ISystemState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
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

    case PUSH_BACKWARD:
      console.log('systemReducer', payload);
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: true,
          backwardStack: [...state.header.backwardStack, payload],
        },
      };

    case PULL_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: state.header.backwardStack.length > 0,
          backwardStack: [...state.header.backwardStack.slice(0, -1)],
        },
      };

    case CLEAR_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          isBackward: false,
          backwardStack: [],
        },
      };

    default:
      return state;
  }
}
