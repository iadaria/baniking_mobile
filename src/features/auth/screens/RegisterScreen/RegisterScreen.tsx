import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '~/src/app/models/user';
import { connect } from 'react-redux';
import { socialLogin } from '~/src/features/auth/store/authActions';
import { AppText, Block } from '~/src/app/common/components/UI';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthLogo } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import RegisterForm from './RegisterForm';
import SoialLoginBlock from '../components/SoialLoginBlock';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

function RegisterContainer({ navigation }: IProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);

  function handleSubmit() {}

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      alwaysBounceHorizontal
      // contentInsetAdjustmentBehavior="always"
      contentContainerStyle={styles.scrollViewContainer}>
      <Block full bottom debug>
        <Block center margin={[0, 0, sizes.logo.bottom]}>
          <AuthLogo />
        </Block>
        <Block style={styles.list} flex={0.9} full base white>
          <RegisterForm scrollViewRef={scrollViewRef} />
          {/* Social login block */}
          <SoialLoginBlock />
          {/* Sign in */}
          <Block row middle debug>
            <AppText primary center>
              Уже зарегистрированы?
            </AppText>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <AppText secondary> Войдите</AppText>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}

// color, fontFamily, align, size

const RegisterConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    socialLogin: socialLogin,
  },
)(RegisterContainer);

export { RegisterConnected as RegisterScreen };

// <SocialLogin socialLogin={socialLogin} />

const styles = StyleSheet.create({
  scrollView: {},
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 100,
  },
  list: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  /* scrollView: {
    borderWidth: 2,
    borderColor: 'green',
    position: 'absolute',
    bottom: 0,
  }, */
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
