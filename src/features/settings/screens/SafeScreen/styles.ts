import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  label: {
    textAlign: 'left',
    fontSize: wp(sizes.text.label),
    marginTop: wp(2),
  },
  input: {
    borderColor: colors.input.borderEdit,
    height: hp(sizes.input.heightEdit),
    color: colors.text.base,
    fontSize: wp(sizes.input.text),
  },
  lastInput: {
    marginBottom: wp(3),
  },
});
