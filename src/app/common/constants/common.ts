import { Image } from 'react-native';
import { defaultUserMaleImg } from '~/src/assets';

// export const USER_IMAGE_PATH = Image.resolveAssetSource('~/src/assets/images/png/user.png';
export const USER_IMAGE_PATH = Image.resolveAssetSource(defaultUserMaleImg).uri;

export const appPatterns = {
  filename: /^.*[\\\/]/,
};