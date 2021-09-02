import * as constants from './systemConstants';

interface IAction {
  type: string;
  payload: any;
}

export interface ISystemState {
  header: {
    points: number;
  };
  connection: null | boolean;
}

const initialState: ISystemState = {
  header: {
    points: 0,
  },
  connection: null,
};

export default function systemReducer(
  state: ISystemState = initialState,
  { type, payload }: any = { type: '', payload: undefined },
): ISystemState {
  switch (type) {
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
