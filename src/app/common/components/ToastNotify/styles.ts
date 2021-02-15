// @flow
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';

export default StyleSheet.create({
  container: {
    // height: hp(5.5),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: wp(sizes.flash.paddingVertical),
    marginHorizontal: wp(sizes.offset.base),
    // marginHorizontal: wp(4),
    // opacity: 0.9,
  },
  gold: {
    backgroundColor: colors.secondary,
  },
  error: {
    backgroundColor: colors.error,
  },
  errorText: {
    textAlign: 'center',
    // fontFamily: fonts.medium,
  },
  message: {
    flex: 1,
    flexDirection: 'row',
    textAlignVertical: 'center',
    fontSize: wp(3.5),
    // fontFamily: fonts.medium,
    color: colors.white,
  },
  status: {
    height: '100%',
    marginLeft: wp(6),
    color: colors.white,
  },
  closeImg: {
    width: wp(4),
    resizeMode: 'contain',
    marginLeft: wp(6),
  },
});
