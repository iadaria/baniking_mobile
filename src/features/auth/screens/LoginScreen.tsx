import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '~/src/app/models/user';
// import SocialLogin from './components/SocialLogin';
import { connect } from 'react-redux';
import { socialLogin } from '~/src/features/auth/store/authActions';
import {
  AppInput,
  AppSwitch,
  AppText,
  Block,
} from '~/src/app/common/components/UI';
import { StyleSheet } from 'react-native';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import {
  AuthLogo,
  AuthLogoLeft,
  AuthLogoRight,
  TextLabelNecessary,
} from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
// import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

function LoginScreen({ socialLogin }: IProps) {
  const [newsletter, setNewsletter] = React.useState(true);

  return (
    <Block full bottom debug>
      <Block center margin={[0, 0, sizes.logo.bottom]}>
        <AuthLogo />
      </Block>

      <Block style={styles.form} flex={0.9} full base white>
        {/* Registration header */}
        <Block margin={[0, 0, 2]} row middle center>
          <AuthLogoLeft />
          <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
            Регистрация
          </AppText>
          <AuthLogoRight />
        </Block>

        <Block row middle center>
          <AppText semibold primary size={sizes.text.label}>
            Фамилия
          </AppText>
          <TextLabelNecessary style={{ marginHorizontal: 3 }} />
        </Block>
        <AppInput
          placeholder="Фамилия"
          defaultValue="Иванов"
          // error="Внесено некорректное значение"
        />

        <Block row middle center>
          <AppText semibold primary size={sizes.text.label}>
            Email
          </AppText>
          <TextLabelNecessary style={{ marginHorizontal: 3 }} />
        </Block>
        <AppInput defaultValue="Andrey@mail.com" />

        <Block row middle center>
          <AppText semibold primary size={sizes.text.label}>
            Номер телефона
          </AppText>
          <TextLabelNecessary style={{ marginHorizontal: 3 }} />
        </Block>
        <AppInput defaultValue="+7" />

        <AppText primary>
          Я согласен с правилами сайта и политикой обработки персональных данных
        </AppText>

        <Block margin={[3, 0]}>
          <AppButton>
            <AppText center medium>
              Завершить регистрацию
            </AppText>
          </AppButton>
        </Block>
      </Block>
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

const styles = StyleSheet.create({
  form: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});

{
  /* <AppButton disabled={true}>
<AppText center medium disabled={true}>
  Восстановить
</AppText>
</AppButton>
<AppSwitch value={newsletter} onValueChange={setNewsletter} /> */
}
