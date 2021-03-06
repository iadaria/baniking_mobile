import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, multiplier, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  qrLogo: {
    marginTop: wp(12) * multiplier,
    marginBottom: wp(5) * multiplier,
    alignSelf: 'center',
  },
  qr: {
    height: wp(sizes.qr.main) * multiplier,
    width: wp(sizes.qr.main) * multiplier,
    marginTop: wp(11) * multiplier,
    alignSelf: 'center',
  },
  input: {
    borderColor: colors.input.borderEdit,
    borderWidth: 0.5,
    height: hp(sizes.input.heightEdit),
    color: colors.qr.number,
    fontSize: wp(sizes.input.text),
  },
});
