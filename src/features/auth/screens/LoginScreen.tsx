import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '~/src/app/models/user';
// import SocialLogin from './components/SocialLogin';
import { connect } from 'react-redux';
import { socialLogin } from '~/src/features/auth/store/authActions';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { Platform, ScrollView } from 'react-native';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
// import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

function LoginScreen({ socialLogin }: IProps) {
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  return (
    <ScrollView>
      <Block full safe middle white base flex={0.3}>
        <AppInput
          label="Имя"
          placeholder="Введите имя"
          defaultValue="Антон"
          error="Внесено некорректное значение"
        />
        <AppInput label="Фамилия" defaultValue="Сергеев" />
        <AppInput label="E-mail или телефон" placeholder="email@company.com" />

        <AppButton>
          <AppText center medium>
            Восстановить
          </AppText>
        </AppButton>

        <AppButton disabled={true}>
          <AppText center medium disabled={true}>
            Восстановить
          </AppText>
        </AppButton>
      </Block>
    </ScrollView>
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
