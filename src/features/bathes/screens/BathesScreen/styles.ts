import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
  },
  searchIconButton: {
    padding: wp(2.5)
  },
  filter: {
    borderWidth: 0.8,
    borderColor: colors.bath.elementBorder,
    padding: wp(3),
    borderRadius: 7,
  },
  sort: {
    borderWidth: 0.5,
    borderColor: colors.bath.elementBorder,
    padding: wp(3),
    marginTop: wp(3),
    borderRadius: 7,
    justifyContent: 'space-between'
  },
});