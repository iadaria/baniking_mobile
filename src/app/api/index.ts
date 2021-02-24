import axios from 'axios';

type Methods = 'put' | 'send' | 'get' | 'post';

export const URL_API = 'https://baniking.ru/api/v1';

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

// const defaultLists = { page: 1, pageSize: 50, order: -1, read: 0 };
/* const objToUrl = (obj: null | { [key: string]: string | number | Array<number> }) =>
  obj
    ? `?${Object.keys(obj)
        .map((key) => `${key}=${Array.isArray(obj[key]) ? `"${String(obj[key])}"` : obj[key]}`)
        .join('&')}`
    : ''; */

const request = (method: Methods, _endpoint: string | Function, entity: any) => async (
  data: null | any,
  params: any,
) => {
  const endpoint = typeof _endpoint === 'function' ? _endpoint(params) : _endpoint;

  try {
    const res = await entity[method](endpoint, data);
    if (res.data && res.data.data) {
      return { ...res.data.data, ...res.data.meta };
    }
    return res.data || res;
  } catch (error) {
    console.log(`%c===> request error: ${method} ${endpoint || ''}\n`, 'color: red; font-weight: 600', error);

    throw error.response || error;
  }
};

export const methods = {
  // User
  login: request('post', '/login', pubFetch),
  register: request('post', '/register', pubFetch),
  recovery: request('post', '/passwords/reset', privFetch),
  // getCurrentUser: request('get', '/profile', privFetch),
  // Cabnet
  getProfile: request('get', '/profile', privFetch),
  uploadAvatar: request('post', '/profile/avatar', privFetch),
  getCabinet: request('get', '/cabinet', privFetch),
};

// for debugger
/* eslint-disable no-undef */
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
