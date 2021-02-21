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
 * @field login {string}
 * @field email {string}
 * @field password {string}
 * @field provider {string}
 * @field device_name {string}
 * @field persist {boolean}
 */
export interface ICredential {
  login: string;
  email: string;
  phone: string;
  password: string;
  provider: string;
  device_name: string;
  persist: boolean;
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

/**
 * Action for login user
 *
 * @field provider {string} - 'google' | 'vk' | 'yandex' | 'facebook'
 * @field access_token {string}
 * @field uid {boolean}
 * @field photoURL {boolean}
 */
export interface ISocialAccount {
  provider: 'google' | 'vk' | 'yandex' | 'facebook';
  access_token: string;
  uid: string;
  photoURL: string;
}
