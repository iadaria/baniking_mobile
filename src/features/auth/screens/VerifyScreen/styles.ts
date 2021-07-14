import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  scrollView: {
    /* borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'red', */
  },
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
  digit: {
    margin: wp(2),
    //width: wp(15),
    //height: wp(15),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderColor: 'green',
    borderWidth: 1,
    color: colors.secondary,
    fontFamily: fonts.Gilroy.bold,
    fontSize: 33,
  },
});
