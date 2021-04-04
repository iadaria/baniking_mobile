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
    borderColor: '#F5C97D',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: wp(1),
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
  element: {
    backgroundColor: '#121213',
    paddingVertical: wp(2.2),
    paddingHorizontal: wp(3.5),
    borderRadius: sizes.radius,
    alignSelf: 'flex-start',
    marginRight: wp(1.2),
    marginBottom: wp(1.2),
    overflow: 'hidden',
  },
  avatarBorder: {
    borderWidth: 0.5,
    borderColor: colors.golder,
    borderRadius: 50,
    padding: 3,
    alignSelf: 'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(15),
    width: wp(15),
    borderRadius: 50,
  },
  infrastructure: {
    backgroundColor: '#121213',
    borderColor: '#242424',
    borderWidth: 1,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  infrastructureIcon: {
    position: 'absolute',
    right: wp(1),
    bottom: wp(1),
  },
});
