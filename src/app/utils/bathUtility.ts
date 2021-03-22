import { GOOGLE_API } from '@env';
import { Dimensions } from 'react-native';
import ImageResizer, { Response } from 'react-native-image-resizer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { bathOneImg, bathThreeImg, bathTwoImg } from '~/src/assets';
import { methods } from '../api';
import { sizes } from '../common/constants';
import { IDirectionsResponse, TPartDirectionsParams } from '../models/bath';

export const getRandomBathImage = () => {
  const images = [bathOneImg, bathTwoImg, bathThreeImg];
  const randomDigit = Math.floor(Math.random() * 3);
  return images[randomDigit];
};

export const cacheImage = async (image: string): Promise<Response> => {
  //const fileName = getFileName(image);
  //const newFileName = 'file://data/user/0/com.baniking_mobile/cache/' + replaceExtension(fileName, '.png');
  //console.log('[cacheImage/newFilename]', newFileName);
  const width = Dimensions.get('screen').width - wp(sizes.offset.base) * 2;
  return await ImageResizer.createResizedImage(image, width, width, 'PNG', 100);
};

export async function getDirections(params: TPartDirectionsParams): Promise<[number, string]> {
  const newParams = { ...params, key: GOOGLE_API };
  try {
    const { geocoded_waypoints, routes }: IDirectionsResponse = await methods.getDirections(null, newParams);
    if (
      geocoded_waypoints.length > 1 &&
      geocoded_waypoints[0].geocoder_status === 'OK' &&
      geocoded_waypoints[1].geocoder_status === 'OK'
    ) {
      const { legs, overview_polyline } = routes[0];
      return [legs[0].distance.value, overview_polyline.points];
    }
  } catch (error) {
    console.log('[getDirectionsSaga]', error);
  }
  return [0, ''];
}

/* export function withCachedImage(bathes: IBath[]) {
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
} */
