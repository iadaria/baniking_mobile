import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  label: {
    textAlign: 'left',
    fontSize: wp(sizes.text.label),
  },
  input: {
    borderColor: colors.input.borderEdit,
    height: hp(sizes.input.heightEdit),
    color: colors.text.base,
    fontSize: wp(sizes.input.text),
  },
  sex: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2.4),
  },
  sexPassive: {
    backgroundColor: colors.button.sexPassive,
  },
  avatar: {
    height: wp(sizes.avatar.height),
    width: wp(sizes.avatar.height),
    alignSelf: 'flex-start',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.profile.avatarBorder,
  },
});
