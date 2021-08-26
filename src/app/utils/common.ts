export const isBegin = (page: number) => page === 0;
import { appPatterns } from '~/src/app/common/constants/common';

export const SEP_PAGE = 4;

export const canLoadMore = (
  total: number,
  current: number,
  currentPage: number,
) => (currentPage === 0 ? true : total > current);

export const getFileName = (file: string) => {
  return file.replace(appPatterns.filename, '');
};

export const replaceExtension = (file: string, ext: string) => {
  return file.replace(/\.[^/.]+$/, ext);
};

export function replaceAt(str: string, index: number, ch: string) {
  return str.replace(/./g, (c, i) => (i == index ? ch : c));
}

export const isFullCode = (code: string[]) =>
  code.length === 4 && code.join('').length === 4;

export const isExpired = (seconds: number) => seconds <= 0;

export function objectToArray(obj: any) {
  const array: string[] = [];
  for (const key of Object.keys(obj)) {
    array[Number(key)] = obj[key];
  }
  return array;
}

export function compareObj(obj1: any, obj2: any): boolean {
  if (Array.isArray(obj1)) {
    obj1.sort();
  }
  if (Array.isArray(obj2)) {
    obj2.sort();
  }
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function isEmptyObj(obj: any) {
  return Object.keys(obj).length === 0;
}
