import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppInput, AppOpenURL, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { colors, sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight, NecessaryIcon, SwitcherIcon } from '~/src/assets';

const supportedURLOne = 'https://google.com';
// const unsupportedURL = 'slack://open?team=123456';

export default function LoginForm() {
  const [isAccept, setIsAccept] = React.useState<boolean>(true);

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Block>
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
      <AppInput /* defaultValue="Andrey@mail.com"  */ center />
      {/* Passoword  input */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Пароль
        </AppText>
      </Block>
      <AppInput center />
      {/* Accept */}
      <Block margin={[2, 0, 3]} row center middle>
        <TouchableOpacity onPress={setIsAccept.bind(null, !isAccept)}>
          <SwitcherIcon fill={isAccept ? colors.secondary : colors.disable} />
        </TouchableOpacity>
        {/* Gelroy medium 14 */}
        <Block row wrap margin={[0, 0, 0, 2]}>
          <AppText primary medium size={sizes.text.label}>
            Запомнить меня в системе
          </AppText>
        </Block>
      </Block>
      {/* Button */}
      <AppButton>
        <AppText center medium>
          Авторизация
        </AppText>
      </AppButton>
    </Block>
    /* </KeyboardAvoidingView> */
  );
}

const styles = StyleSheet.create({});

/* <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={Platform.select({
      ios: () => 0,
      android: () => -100,
    })()}> */
/* Registration header */
