import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  list: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  element: {
    height: hp(6.5),
    borderRadius: 10,
    //minWidth: wp(35),
  },
  digits: {
    borderRadius: wp(5),
    borderWidth: 1.2,
    padding: wp(2),
  },
  digit: {
    margin: wp(2),
    paddingHorizontal: wp(5),
    //backgroundColor: 'rgba(126, 126, 126, 0.2)',
    borderRadius: wp(2),
    color: colors.secondary,
    fontFamily: fonts.Gilroy.bold,
    fontSize: 33,
  },
  repeat: {
    backgroundColor: 'rgba(126, 126, 126, 0.2)',
    borderRadius: wp(3),
  },
});
