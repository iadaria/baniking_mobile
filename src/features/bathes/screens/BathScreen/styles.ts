import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sizes, colors } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  bathBackground: {
    flexGrow: 1,
    resizeMode: 'contain',
  },
  gradient: {
    flex: 1,
  },
  route: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2),
    paddingHorizontal: wp(3),
    marginLeft: wp(3),
    backgroundColor: '#F3F0EB',
    borderRadius: 10,
  },
  bathMap: {
    // flex: 1,
    marginLeft: 1,
    height: hp(50),
  },
  goldBorder: {
    alignSelf: 'flex-start',
    padding: wp(2),
    paddingHorizontal: wp(3),
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
  },
  photoList: {
    /* borderWidth: 1,
    borderColor: 'red', */
    paddingLeft: wp(sizes.offset.base),
  },
  photoListItem: {
    height: wp(25),
    width: wp(35),
    borderRadius: 10,
    marginRight: wp(3),
  },
});
