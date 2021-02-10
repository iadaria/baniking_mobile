import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '~/src/app/models/user';
// import SocialLogin from './components/SocialLogin';
import { connect } from 'react-redux';
import { socialLogin } from '~/src/features/auth/store/authActions';
import { AppInput, Block } from '~/src/app/common/components/UI';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

function LoginScreen({ socialLogin }: IProps) {
  return (
    <Block base middle full color="white" debug>
      <AppInput label="Имя" placeholder="Введите имя" />
      <AppInput label="Фамилия" />
    </Block>
  );
}

const LoginContainer = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    socialLogin: socialLogin,
  },
)(LoginScreen);

export default LoginContainer;

// <SocialLogin socialLogin={socialLogin} />
