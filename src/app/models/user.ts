export interface IPersistUser {
  email: string;
  name: string;
  phone: string;
  userId: string;
  avatar: string;
  verified: boolean;
  role: Role;
  accounts: Array<ISocialAccount>;
  // contact?:
  // contactsAllowed: boolean;
}

export enum SocialProvider {
  Google = 'google',
  VK = 'VK',
  Yandex = 'Yandex',
  Facebook = 'Facebook',
}

/**
 * Action for login user
 *
 * @provider {string} - 'google' | 'vk' | 'yandex' | 'facebook'
 * @access_token {string}
 * @uid {string}
 * @photo {string}
 */
export interface ISocialAccount {
  provider: SocialProvider;
  access_token: string;
  uid: string | null;
  photo: string | null;
  name: string | null;
  email: string;
  familyName: string | null;
  givenName: string | null;
  idToken: string | null;
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

export type IUserAuth = {
  phone: string;
  name: string;
  email?: string;
  role?: Role;
  token: string;
  socialProvider: SocialProvider;
  uid: string;
  avatar: string;
  location: ILocation | null;
};

export type ILocation = {
  latitude: number;
  longitude: number;
};
