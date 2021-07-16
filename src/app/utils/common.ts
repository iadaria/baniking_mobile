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

export function isElementExist(
  where: number[],
  what: number,
): [number | undefined, boolean] {
  const _indexOf = where.indexOf(what);
  return [_indexOf, _indexOf !== -1 && _indexOf !== undefined];
}
export function replaceAt(str: string, index: number, ch: string) {
  return str.replace(/./g, (c, i) => (i == index ? ch : c));
}

export const isFullCode = (code: string[]) =>
  code.length === 4 && code.join('').length === 4;

export const isExpired = (seconds: number) => seconds <= 0;
