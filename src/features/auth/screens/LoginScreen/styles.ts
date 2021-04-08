import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '~/src/app/common/constants';

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
  socialButtons: {
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
  },
  socialButton: {
    width: wp(10.14),
    height: wp(10.14),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(0.8),
  },
  element: {
    height: hp(6.5),
    borderRadius: 10,
    //minWidth: wp(35),
  },
});
