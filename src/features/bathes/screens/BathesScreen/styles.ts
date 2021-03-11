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
    padding: wp(2.5),
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
    justifyContent: 'space-between',
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
    height: wp(43),
    marginTop: wp(3),
    justifyContent: 'center',
    marginLeft: wp(5),
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 7,
  },
  kolosIcon: { position: 'absolute', left: -wp(5.5), top: wp(1.2) },
});
