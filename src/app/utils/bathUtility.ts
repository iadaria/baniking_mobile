import { Dimensions } from 'react-native';
import ImageResizer, { Response } from 'react-native-image-resizer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { bathOneImg, bathThreeImg, bathTwoImg } from '~/src/assets';
import { sizes } from '../common/constants';
import { IBath } from '../models/bath';

export const getRandomBathImage = () => {
  const images = [bathOneImg, bathTwoImg, bathThreeImg];
  const randomDigit = Math.floor(Math.random() * 3);
  return images[randomDigit];
};

export const cacheImage = async (image: string): Promise<Response> => {
  const width = Dimensions.get('screen').width - wp(sizes.offset.base) * 2;
  return await ImageResizer.createResizedImage(image, width, width, 'PNG', 100);
};

export function* withCachedImage(bathes: IBath[]) {
  const width = Dimensions.get('screen').width - wp(sizes.offset.base) * 2;
  // console.log(JSON.stringify(bathes, null, 2))
  const newBathes = bathes.map(async (bath: IBath) => {
    if (bath.image) {
      try {
        const response: Response = await ImageResizer.createResizedImage(bath.image, width, width, 'PNG', 100);
        console.log(response);
        return {
          ...bath,
          cachedImage: response.uri,
        };
      } catch (error) {
        console.log('[withCachedImage/error]', error);
      }
    }
    return bath;
  });
  console.log(JSON.stringify(newBathes, null, 2));
  return newBathes;
}
