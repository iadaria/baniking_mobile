import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '~/src/app/models/user';
// import SocialLogin from './components/SocialLogin';
import { connect } from 'react-redux';
import { socialLogin } from '~/src/features/auth/store/authActions';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthLogo, FacebookIcon, GoogleIcon, VkIcon, YandexIcon } from '~/src/assets';
import { colors, sizes } from '~/src/app/common/constants';
import LoginForm from './LoginForm';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

function LoginContainer({ navigation }: IProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      style={styles.scrollView}
      alwaysBounceHorizontal
      // contentInsetAdjustmentBehavior="always"
      contentContainerStyle={styles.scrollViewContainer}>
      <Block full debug>
        {/* Top log */}
        <Block flex={0.3} center bottom margin={[0, 0, sizes.logo.bottom]}>
          <AuthLogo />
        </Block>
        {/* Login Form */}
        <Block style={styles.list} full base white>
          <LoginForm scrollViewRef={scrollViewRef} />
          {/*  Social login block */}
          <Block margin={[9, 0, 3]} debug>
            <AppText caption medium center size={sizes.text.label + 0.1}>
              Или войдите через социальные сети
            </AppText>
            <Block /* margin={[1.5, 0, 0]}  */ row middle>
              <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                <FacebookIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                <GoogleIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                <VkIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                <YandexIcon />
              </TouchableOpacity>
            </Block>
          </Block>
          {/*  Sign in  */}
          <Block margin={[0, 0, 0]} row middle debug>
            <AppText primary center>
              Eще не зарегистрированы?
            </AppText>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <AppText secondary> Регистрация</AppText>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}

// color, fontFamily, align, size

const LoginConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    socialLogin: socialLogin,
  },
)(LoginContainer);

export { LoginConnected as LoginScreen };

// <SocialLogin socialLogin={socialLogin} />

const styles = StyleSheet.create({
  scrollView: {
    /* borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'red', */
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  list: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  socialButtons: {
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
  },
  socialButton: {
    width: wp(10.14),
    height: wp(10.14),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(0.8),
  },
});
