import { GOOGLE_API } from '@env';
import { Dimensions } from 'react-native';
import ImageResizer, { Response } from 'react-native-image-resizer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { bathOneImg, bathThreeImg, bathTwoImg } from '~/src/assets';
import { methods } from '../api';
import { sizes } from '../common/constants';
import {
  IDirectionsResponse,
  IDistanceResponse,
  TPartDirectionsParams,
  TPartDistanceParams,
} from '../models/bath';

export const getRandomBathImage = () => {
  const images = [bathOneImg, bathTwoImg, bathThreeImg];
  const randomDigit = Math.floor(Math.random() * 3);
  return images[randomDigit];
};

export const isNonRating = (rating: number) => ['0', '0.0'].indexOf(String(rating)) !== -1;

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

export async function getPoints(params: TPartDirectionsParams): Promise<string | null> {
  const newParams = { ...params, key: GOOGLE_API };
  try {
    const { geocoded_waypoints, routes }: IDirectionsResponse = await methods.getDirections(null, newParams);
    if (
      geocoded_waypoints.length > 1 &&
      geocoded_waypoints[0].geocoder_status === 'OK' &&
      geocoded_waypoints[1].geocoder_status === 'OK'
    ) {
      const { overview_polyline } = routes[0];
      return overview_polyline.points;
    }
  } catch (error) {
    console.log('[getDirectionsSaga]', error);
  }
  return null;
}

export async function getDistance(params: TPartDistanceParams): Promise<number | null> {
  const newParams = { ...params, key: GOOGLE_API, units: 'metric' };
  try {
    const { rows, status }: IDistanceResponse = await methods.getDistance(null, newParams);
    if (status === 'OK' && rows[0].elements[0].status === 'OK') {
      const { distance } = rows[0].elements[0];
      return distance.value;
    }
  } catch (error) {
    console.log('[getDirectionsSaga]', error);
  }
  return null;
}

interface IDistance {
  lant1: number;
  long1: number;
  lant2: number;
  long2: number;
}

var rad = function (x: number) {
  return (x * Math.PI) / 180;
};

export const isLatitude = (num: number) => isFinite(num) && Math.abs(num) <= 90;
export const isLongitude = (num: number) => isFinite(num) && Math.abs(num) <= 180;

export function calculateDistance(props: IDistance) {
  const { lant1, long1, lant2, long2 } = props;
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(lant2 - lant1);
  var dLong = rad(long2 - long1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lant1)) * Math.cos(rad(lant2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
  // console.log('[bathUtility/calculateDisntance]', d / 1000);
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
