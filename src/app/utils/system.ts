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

export function numberWithSpaces(x: Number) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

export function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4];
  }
  return null;
}

export function getCardNumber(values: string) {
  return values.replace(/^[\d ]*[/d].$/, '');
}

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
