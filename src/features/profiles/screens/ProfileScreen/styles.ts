import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  scrollView: {
    position: 'relative',
    padding: wp(sizes.offset.base),
  },
  scrollViewContainer: {
    paddingBottom: wp(20),
  },
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
    alignSelf: 'flex-start',
    marginTop: wp(0.9),
    marginBottom: wp(7),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.profile.avatarBorder,
  },
  avatarImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(sizes.avatar.height) - 1,
    width: wp(sizes.avatar.height) - 1,
    borderRadius: 50,
    opacity: 0.8,
  },
  avatarCloseIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: wp(4),
  },
  avatarMenu: {
    position: 'absolute',
    opacity: 0.85,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingVertical: wp(sizes.offset.base),
    backgroundColor: colors.primary,
  },
  avatarMenuItem: {
    marginVertical: wp(0.5),
    marginHorizontal: wp(sizes.offset.base),
    backgroundColor: colors.buttonBeginning,
    color: colors.primary,
  },
  delete: {
    backgroundColor: colors.button.delete,
  },
});
