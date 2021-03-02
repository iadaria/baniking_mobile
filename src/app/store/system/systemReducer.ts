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
}

const initialState: ISystemState = {
  header: {
    isDrawerOpen: false,
    isBackward: false,
    backwardStack: [],
    points: 0,
  },
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

    case constants.CLEAR_SYSTEM:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
