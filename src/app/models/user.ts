export interface IUser {
  username?: string;
  displayName?: string;
  token: string;
  image?: string;
  email: string; // +
  uid?: string;
  photoURL?: string; // +
  providerId?: string;
}

export interface IUserFormValues {
  email: string;
  passsword: string;
  displayName?: string;
  username: string;
  phone?: string;
}

/**
 * Action for login user
 *
 * @field login? {string}
 * @field password? {string}
 * @field provider? {string}
 * @field device {string}
 */
export interface ICredential {
  login: string;
  email: string;
  phone: string;
  password: string;
  provider: string;
  device: string;
}

export enum Role {
  User,
  Manager,
}

export interface IUserAuth {
  name: string;
  email?: string;
  role: Role;
  token: string;
}

export interface IUserPersist {
  token: string;
  email: string;
  phone: string;
  avatar: string;
  role: Role;
}

export interface ISocialAccount {
  provider: 'google' | 'vk' | 'yandex' | 'facebook';
  access_token: string;
  uid: string;
  photoURL: string;
}
