export interface IPersistUser {
  email: string;
  name: string;
  phone: string;
  userId: string;
  avatar: string;
  verified: boolean;
  role: Role;
  accounts: ISocialAccount[];
  // contact?:
  // contactsAllowed: boolean;
}

/**
 * Action for login user
 *
 * @field login? {string}
 * @field name? {string}
 * @field email? {string}
 * @field password? {string}
 * @field provider? {string}
 * @field device_name? {string}
 * @field persist? {boolean}
 */
export interface ICredential {
  login: string;
  name: string;
  first_name: string;
  email: string;
  phone: string;
  password: string;
  provider: string;
  device_name: string;
  agreement: boolean;
  persist: boolean;
}

export enum Role {
  User,
  Manager,
}

export interface IUserAuth {
  name: string;
  email?: string;
  role?: Role;
  token: string;
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
