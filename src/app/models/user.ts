export interface IUser {
  username: string;
  displayName: string;
  token: string;
  image?: string;
  email: string; // +
  uid: string;
  photoURL: string; // +
  providerId: string;
}

export interface IUserFormValues {
  email: string;
  passsword: string;
  displayName?: string;
  username?: string;
  phone?: string;
}