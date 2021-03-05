import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  qrLogo: {
    marginTop: wp(12),
    marginBottom: wp(5),
    alignSelf: 'center',
  },
  qr: {
    height: wp(sizes.qr.main),
    width: wp(sizes.qr.main),
    marginTop: wp(11),
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
