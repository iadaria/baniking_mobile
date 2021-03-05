import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  qr: {
    height: wp(sizes.qr.main),
    width: wp(sizes.qr.main),
  },
});