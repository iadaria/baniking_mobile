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
    /* borderWidth: 1,
    borderColor: 'green', */
  },
  absolute: {
    position: 'absolute',
    opacity: isIos ? 0.95 : 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  tabsContainer: {
    position: 'absolute',
    bottom: wp(20),
    width: windowWidth,
  },
  tab: {
    width: wp(3),
    backgroundColor: 'grey',
    height: wp(1.05),
    marginHorizontal: 3,
    borderRadius: 6,
    /* borderColor: 'green',
    borderWidth: 1, */
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    //justifyContent: 'space-evenly',
  },
});
