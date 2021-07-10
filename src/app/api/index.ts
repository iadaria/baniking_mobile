import axios from 'axios';
import { HOST_API } from 'react-native-dotenv';
import {
  TPartBathParams,
  IGooglePlaceParams,
  IDirectionsParams,
  IDistanceParams,
} from '../models/bath';
import { log } from '../utils/debug';

type Methods = 'put' | 'send' | 'get' | 'post';

export const URL_API = HOST_API;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 120000;
axios.defaults.baseURL = URL_API;

const pubFetch = axios.create();
const privFetch = axios.create();

export const tokenToHeaders = (token: string) => {
  privFetch.defaults.headers.get.Authorization = `Bearer ${token}`;
  privFetch.defaults.headers.post.Authorization = `Bearer ${token}`;
  privFetch.defaults.headers.put.Authorization = `Bearer ${token}`;
};

// Объект параметров может быть либо нулевым либо представлять собой объект с несклькими
// Свойства объекта могут иметь значения: строка, номер или массив чисел
type TObjToUrl = null | { [key: string]: string | number | Array<number> };

function arrayToQuery(name_array: string, array: any[]) {
  //return array.map((key: any) => name_array + '=' + key).join('&');
  return array
    .map((key: any, index: number) => `${name_array}[${index}]=${key}`)
    .join('&');
}

// const defaultLists = { page: 1, pageSize: 50, order: -1, read: 0 };
export const objToUrl = (obj: TObjToUrl) => {
  const result = obj
    ? `?${Object.keys(obj)
        //.map((key) => `${key}=${Array.isArray(obj[key]) ? `"${String(obj[key])}"` : obj[key]}`)
        .map((key) =>
          Array.isArray(obj[key])
            ? arrayToQuery(key, obj[key] as any[])
            : `${key}=${obj[key]}`,
        )
        .join('&')}`
    : '';

  //log('\n[api/index(objToUrl)]', result);
  return result;
};

const request = (
  method: Methods,
  _endpoint: string | Function,
  entity: any,
) => async (data: null | any, params: any, headers?: any) => {
  const endpoint =
    typeof _endpoint === 'function' ? _endpoint(params) : _endpoint;

  try {
    const res = await entity[method](endpoint, data, headers && { headers });
    if (res.data && res.data.data) {
      return { ...res.data.data, ...res.data.meta };
    }
    return res.data || res;
  } catch (error) {
    log(`%c===> request error: ${method} ${endpoint || ''}\n`, error);

    throw error.response || error;
  }
};

export const methods = {
  // User
  login: request('post', '/login', pubFetch),
  register: request('post', '/register', pubFetch),
  verify: request('post', '/verification/verify', pubFetch),
  registerComplete: request('post', '/registration/complete', pubFetch),
  reset: request('post', '/passwords/reset', privFetch),
  // settings
  changePassword: request('put', '/password', privFetch),
  // profile
  getProfile: request('get', '/profile', privFetch),
  updateProfile: request('put', '/profile', privFetch),
  uploadAvatar: request('post', '/profile/avatar', privFetch),
  // cabinet
  getCabinet: request('get', '/cabinet', privFetch),
  // qr
  getQr: request('get', '/cabinet/qr', privFetch),
  // bathes
  getBathes: request(
    'get',
    (bathParams: TPartBathParams) => `/baths${objToUrl(bathParams)}`,
    privFetch,
  ),
  getFilterBathes: request('get', '/baths', privFetch),
  getBathParams: request('get', '/baths/params', privFetch),
  getBath: request('get', (bathId: number) => `/baths/${bathId}`, privFetch),
  // google
  getPlaceId: request(
    'get',
    (placeParams: IGooglePlaceParams) =>
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json${objToUrl(
        placeParams,
      )}`,
    pubFetch,
  ),
  getDirections: request(
    'get',
    (directionParams: IDirectionsParams) =>
      `https://maps.googleapis.com/maps/api/directions/json${objToUrl(
        directionParams,
      )}`,
    pubFetch,
  ),
  getDistance: request(
    'get',
    (distanceParams: IDistanceParams) =>
      `https://maps.googleapis.com/maps/api/distancematrix/json${objToUrl(
        distanceParams,
      )}`,
    pubFetch,
  ),
  // orderCall
  orderCall: request('post', '/baths/orderCall', privFetch),
};

// for debugger
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
