import { Platform } from 'react-native';
import { Sex } from '../models/profile';

export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function getImageExtension(file: string): string | null {
  const found = file.match(/^.*\.(jpg|JPG|gif|GIF|png|PNG|JPEG|jpeg)$/);
  if (found && found.length > 1) {
    return found[1];
  } else {
    return null;
  }
}

export function isAllowedImageType(type: string) {
  const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  return types.includes(type);
}

export const getSex = (_sex: number) => (_sex === Sex.Male ? Sex.Male : Sex.Female);

export function numberWithSpaces(x: string) {
  if (x) {
    console.log('number', x);
    const result = x?.match(/[\d]{4}[\d ]{15}/);
    console.log('[utils/system] result number', result);
    if (result && result.length > 0) {
      return result[0];
    }
  }
  return '';
}

export function getCardNumber(values: string) {
  return values.replace(/^[\d ]*[/d].$/, '');
}

export const isAndroid = Platform.OS === 'android' ? true : false;
export const isIOS = Platform.OS === 'ios' ? true : false;
