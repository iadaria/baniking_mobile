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
    currentScreen?: string;
    isTransparent: boolean;
  };
  connection: null | boolean;
}

const initialState: ISystemState = {
  header: {
    isDrawerOpen: false,
    isBackward: false,
    backwardStack: [],
    points: 0,
    isTransparent: false,
  },
  connection: null,
};

export default function systemReducer(
  state: ISystemState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): ISystemState {
  switch (type) {
    case constants.TRANSPARENT_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          isTransparent: true,
        },
      };

    case constants.NON_TRANSPARENT_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          isTransparent: false,
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
