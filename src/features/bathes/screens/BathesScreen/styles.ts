import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: colors.white,
    borderRadius: sizes.input.big.radius,
    color: colors.input.text,
    height: hp(sizes.input.big.height),
    flexGrow: 1,
    marginRight: wp(3),
  },
  searchIcon: {
    width: wp(5),
    height: wp(5),
  },
  searchInput: {
    flexGrow: 1,
    paddingHorizontal: wp(sizes.input.paddingHorizontal),
    color: '#000',
    // fontFamily: fonts.Gilroy.medium,
  },
  searchIconButton: {
    padding: wp(3.5),
  },
  filter: {
    borderWidth: 0.8,
    borderColor: colors.bath.elementBorder,
    padding: wp(3),
    borderRadius: 7,
  },
  badge: {
    position: 'absolute',
    top: -wp(2),
    right: -wp(2),
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: 40,
    backgroundColor: colors.secondary,
  },
  sorter: {
    marginLeft: wp(4),
    borderWidth: 0.5,
    borderColor: colors.bath.elementBorder,
    padding: wp(3),
    marginTop: wp(3),
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phone: {
    alignSelf: 'flex-start',
    marginTop: wp(2.8),
    paddingHorizontal: wp(5),
    paddingVertical: wp(2.3),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.bath.phoneBorder,
  },
  backgroundImage: {
    position: 'relative',
    minHeight: wp(38), //43
    marginTop: wp(3),
    justifyContent: 'center',
    // marginLeft: wp(5),
    // paddingLeft: wp(5),
    opacity: 0.8,
    zIndex: 1,
  },
  gradient: {
    flex: 1,
    paddingVertical: wp(2),
    // justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 7,
  },
  kolosIcon: {
    position: 'absolute',
    //left: -wp(5),
    left: -wp(5),
    top: wp(3.8),
  },
  temporaryImg: {
    height: wp(38), // 43
    position: 'absolute',
    right: 0,
    borderRadius: 7,
    width: '103%',
    zIndex: 2,
  },
  notFoundIcon: {
    marginBottom: hp(3),
  },
  city: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
