import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  // socialLogin as socialLoginAction,
  emailLogin as emailLoginAction,
} from '~/src/features/auth/store/authActions';
import { ICredential } from '~/src/app/models/user';
import { colors, multiplier, sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight, SwitcherIcon } from '~/src/assets';
import { defaultLoginInputs } from '../contracts/loginInputs';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  // socialLogin: ({ provider }: ICredential) => void;
  emailLogin: ({ login, password }: Partial<ICredential>) => void;
}

const LoginFormContainer = ({ navigation, scrollViewRef, emailLogin }: IProps): JSX.Element => {
  const [isPersist, setIsPersist] = React.useState<boolean>(true);
  const [recreate, setRecreate] = React.useState<boolean>(true);
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<Partial<ICredential>>({ login: '', password: '' });

  const handleEmailLogin = async () => {
    if (valuesRef.current) {
      const device_name = await DeviceInfo.getDeviceName();
      const data = {
        login: valuesRef.current.login,
        password: valuesRef.current.password,
        device_name: device_name,
        persist: isPersist,
      };

      __DEV__ && console.log('***** data *******', data);
      emailLogin(data);
      setRecreate(!recreate);
    }
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultLoginInputs}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Авторизация
        </AppText>
        <AuthLogoRight />
      </Block>
      {/* Email / Telephone Input */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Email / Телеофон
        </AppText>
      </Block>
      <AppInput center id="login" placeholder="Введите e-mail" maxLength={50} />
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Пароль
        </AppText>
        <TouchableOpacity
          style={{ position: 'absolute', right: 0 }}
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <AppText secondary medium size={sizes.text.label}>
            Забыли пароль?
          </AppText>
        </TouchableOpacity>
      </Block>
      <AppInput center id="password" placeholder="Введите пароль" maxLength={50} secure />
      <Block margin={[2, 0, 3]} row center middle>
        <TouchableOpacity onPress={setIsPersist.bind(null, !isPersist)}>
          <SwitcherIcon width={21 * multiplier} fill={isPersist ? colors.secondary : colors.disable} />
        </TouchableOpacity>
        {/* Gelroy medium 14 */}
        <Block row wrap margin={[0, 0, 0, 2]}>
          <AppText primary medium size={sizes.text.label}>
            Запомнить меня в системе
          </AppText>
        </Block>
      </Block>
      {/* Button */}
      <AppButton onPress={handleEmailLogin}>
        <AppText center medium>
          Авторизироваться
        </AppText>
      </AppButton>
      {/* Button for test */}
      {/* <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={async () => await handleEmailLogin()}>
        <AppText>Test</AppText>
      </TouchableOpacity> */}
    </ValidatedElements>
  );
};

const LoginFormConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    // socialLogin: socialLoginAction,
    emailLogin: emailLoginAction,
  },
)(LoginFormContainer);

export { LoginFormConnected as LoginForm };
