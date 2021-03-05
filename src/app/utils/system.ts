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

export function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function decodeBase64Image(dataString: string) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = {};

  if (matches?.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}
