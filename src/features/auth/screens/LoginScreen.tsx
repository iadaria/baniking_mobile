import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '~/src/app/models/user';
// import SocialLogin from './components/SocialLogin';
import { connect } from 'react-redux';
import { socialLogin } from '~/src/features/auth/store/authActions';
import { AppInput, AppOpenURL, AppText, Block } from '~/src/app/common/components/UI';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { AuthLogo, AuthLogoLeft, AuthLogoRight, NecessaryIcon, SwitcherIcon } from '~/src/assets';
import { colors, sizes } from '~/src/app/common/constants';
// import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

const supportedURLOne = 'https://google.com';
const supportedURLTwo = 'https://yandex.ru';
// const unsupportedURL = 'slack://open?team=123456';

function LoginScreen({ socialLogin }: IProps) {
  const [isAccept, setIsAccept] = React.useState<boolean>(true);

  return (
    // <ScrollView style={styles.scrollView}>
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
          <NecessaryIcon style={{ marginHorizontal: 3 }} />
        </Block>
        <AppInput
          placeholder="Фамилия"
          defaultValue="Иванов"
          center
          // error="Внесено некорректное значение"
        />
        <Block row middle center>
          <AppText primary semibold size={sizes.text.label}>
            Email
          </AppText>
          <NecessaryIcon style={{ marginHorizontal: 3 }} />
        </Block>
        <AppInput defaultValue="Andrey@mail.com" center />
        {/* Phone */}
        <Block row middle center>
          <AppText primary semibold size={sizes.text.label}>
            Номер телефона
          </AppText>
          <NecessaryIcon style={{ marginHorizontal: 3 }} />
        </Block>
        <AppInput defaultValue="+7" center mask="+7 ([000]) [000] [00] [00]" />
        {/* Accept */}
        <Block margin={[3, 0, 5]} row center>
          <TouchableOpacity onPress={setIsAccept.bind(null, !isAccept)}>
            <SwitcherIcon fill={isAccept ? colors.secondary : colors.disable} />
          </TouchableOpacity>
          {/* Gelroy medium 14 */}
          <Block row style={{ flexWrap: 'wrap' }} margin={[0, 0, 0, 2]}>
            <AppText primary medium size={sizes.text.label}>
              Я согласен с
            </AppText>
            <AppOpenURL url={supportedURLOne} title=" правилами сайта " secondary medium size={sizes.text.label} />
            <AppText primary medium size={sizes.text.label}>
              и
            </AppText>
            <AppOpenURL url={supportedURLOne} title=" политикой " secondary medium size={sizes.text.label} />
            <AppOpenURL
              url={supportedURLOne}
              title="обработки персональных данных"
              secondary
              medium
              size={sizes.text.label}
            />
          </Block>
        </Block>
        <AppButton>
          <AppText center medium>
            Завершить регистрацию
          </AppText>
        </AppButton>
        {/* End Form */}
      </Block>
    </Block>
    // </ScrollView>
  );
}

// color, fontFamily, align, size

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
  scrollView: {
    borderWidth: 2,
    borderColor: 'green',
    position: 'absolute',
    bottom: 0,
  },
});
