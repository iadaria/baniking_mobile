import { IUser } from '~/app/models/user';

export interface IAuthState {
  authenticated: boolean;
  currentUser: IUser | null;
  laoding: boolean;
}

const initialState = {
  authenticated: false,
  currentUser: null,
  laoding: false,
};

