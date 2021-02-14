import React from 'react';
import { TouchableOpacity } from 'react-native';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { colors, sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight, SwitcherIcon } from '~/src/assets';
import { loginInputs } from '../contracts/loginInputs';


const LoginForm = () => {
  const [isAccept, setIsAccept] = React.useState<boolean>(true);

  return (
    <ValidatedElements defaultInputs={loginInputs}>
      <AppInput center id="login" />
      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
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
        <AppInput center id="login" />
        {/* <AppInput
          value={values.login}
          onChangeText={handleChange('login')}
          onBlur={handleBlur('login')}
          // error="Dasha"
          center
        /> */}
        {/* Passoword  input */}
        <Block row middle center>
          <AppText primary semibold size={sizes.text.label}>
            Пароль
          </AppText>
        </Block>
        <AppInput center id="password" />
        {/* <AppInput
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          center
        /> */}
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
        <AppButton onPress={() => {}}>
          <AppText center medium>
            Авторизироваться
          </AppText>
        </AppButton>
      </Block>
      {/* </KeyboardAvoidingView> */}
    </ValidatedElements>
  );
};

export default LoginForm;

/* <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={Platform.select({
      ios: () => 0,
      android: () => -100,
    })()}> */
/* Registration header */
