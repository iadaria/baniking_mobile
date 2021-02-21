import { StyleSheet } from 'react-native';
import { colors } from '~/src/app/common/constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SIZE_AVATAR = 20;

export const styles = StyleSheet.create({
  avatarBorder: {
    borderWidth: 0.5,
    borderColor: colors.secondary,
    borderRadius: 50,
    padding: 3,
    alignSelf: 'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(SIZE_AVATAR),
    width: wp(SIZE_AVATAR),
    borderRadius: 50,
  },
});
