import * as constants from './systemConstants';

interface IAction {
  type: string;
  payload: any;
}

export interface ISystemState {
  header: {
    isDrawerOpen: boolean;
    isBackward: boolean;
    backwardStack: string[];
    points: number;
  };
  connection: null | boolean;
}

const initialState: ISystemState = {
  header: {
    isDrawerOpen: false,
    isBackward: false,
    backwardStack: [],
    points: 0,
  },
  connection: null,
};

export default function systemReducer(
  state: ISystemState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): ISystemState {
  switch (type) {
    case constants.OPEN_DRAWER:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: true,
          isBackward: false,
        },
      };

    case constants.CLOSE_DRAWER:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: false,
        },
      };

    case constants.ENABLE_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: true,
        },
      };

    case constants.DISABLE_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          // isDrawerOpen: false,
          isBackward: false,
        },
      };

    case constants.PUSH_BACKWARD:
      // Находим длину стека
      const length = state.header.backwardStack.length;
      // Находим последнюю страницу в стеке
      const last = length - 1 >= 0 ? state.header.backwardStack[length - 1] : null;
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: true,
          // Если нет в стеке этой страницы, чтобы не повторять
          backwardStack:
            (last && last !== payload) || !last
              ? [...state.header.backwardStack, payload]
              : [...state.header.backwardStack],
        },
      };

    case constants.PULL_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          isDrawerOpen: false,
          isBackward: state.header.backwardStack.length > 0,
          backwardStack: [...state.header.backwardStack.slice(0, -1)],
        },
      };

    case constants.CLEAR_BACKWARD:
      return {
        ...state,
        header: {
          ...state.header,
          isBackward: false,
          backwardStack: [],
        },
      };

    case constants.SET_TITLE_POINTS:
      return {
        ...state,
        header: {
          ...state.header,
          points: payload,
        },
      };

    // Network
    case constants.UPDATE_STATE_CONNECTION:
      return {
        ...state,
        connection: payload,
      };

    case constants.CLEAR_SYSTEM:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
