import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  bathBackground: {
    flexGrow: 1,
    resizeMode: 'contain',
  },
  bathMap: {
    // flex: 1,
    marginLeft: 1,
    height: hp(50),
  },
});
