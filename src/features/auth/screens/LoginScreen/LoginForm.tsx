import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  Input,
  AppText,
  Block,
  AppInput,
} from '~/src/app/common/components/UI';
import DeviceInfo from 'react-native-device-info';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { loginPhone as loginPhoneAction } from '~/src/features/auth/store/authActions';
import { LoginPhonePayload } from '~/src/features/auth/store/saga/loginPhoneSaga';
import { AuthLogoLeft, AuthLogoRight, SwitcherIcon } from '~/src/assets';
import { defaultLoginInputs } from '../contracts/loginInputs';
import { colors, multiplier, sizes } from '~/src/app/common/constants';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  loginPhone: (payload: LoginPhonePayload) => void;
}

const LoginFormContainer = ({
  navigation,
  scrollViewRef,
  loginPhone,
}: IProps): JSX.Element => {
  const [remember, setRemember] = useState<boolean>(true);
  const [recreate, setRecreate] = useState<boolean>(true);
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<LoginPhonePayload>();

  const handleEmailLogin = async () => {
    if (valuesRef.current) {
      const device_name = await DeviceInfo.getDeviceName();
      const data = {
        ...valuesRef.current,
        device_name,
        remember,
      };
      loginPhone(data);
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
      {/* Telephone Input */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Телефон
        </AppText>
      </Block>
      <Input
        style={{ borderRadius: 10 }}
        id="phone"
        placeholder="+7(___)___-__-__"
        mask="+7([000])[000]-[00]-[00]"
        center
        keyboardType="numeric"
        //isScrollToFocused
      />
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
      <AppInput
        style={{ borderRadius: 10 }}
        id="password"
        placeholder="Введите пароль"
        maxLength={50}
        secure
        center
      />
      <Block margin={[2, 0, 3]} row center middle>
        <TouchableOpacity onPress={setRemember.bind(null, !remember)}>
          <SwitcherIcon
            width={23 * multiplier}
            fill={remember ? colors.secondary : colors.caption}
          />
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
    </ValidatedElements>
  );
};

const LoginFormConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    loginPhone: loginPhoneAction,
  },
)(LoginFormContainer);

export { LoginFormConnected as LoginForm };
