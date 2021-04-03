import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { windowWidth } from '~/src/app/common/constants';
import { isIos, screenHeight } from '~/src/app/common/constants/platform';

export const styles = StyleSheet.create({
  blurImage: {
    width: windowWidth,
    height: windowWidth,
    position: 'absolute',
    top: 0,
  },
  image: {
    width: windowWidth,
    height: screenHeight,
  },
  photo: {
    width: wp(90),
    height: wp(60),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green',
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  absolute: {
    position: 'absolute',
    opacity: isIos ? 0.95 : 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
