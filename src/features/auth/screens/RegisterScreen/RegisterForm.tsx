import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppInput, AppOpenURL, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { colors, sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight, NecessaryIcon, SwitcherIcon } from '~/src/assets';

const supportedURLOne = 'https://google.com';
// const unsupportedURL = 'slack://open?team=123456';

export default function RegisterForm() {
  const [isAccept, setIsAccept] = React.useState<boolean>(true);

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Block>
      <Block margin={[0, 0, 2]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Регистрация
        </AppText>
        <AuthLogoRight />
      </Block>
      <Block row middle center>
        <AppText semibold primary size={sizes.text.label} spacing={-0.4}>
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
        <Block row wrap margin={[0, 0, 0, 2]}>
          <AppText primary medium size={sizes.text.label}>
            Я согласен с
          </AppText>
          <AppOpenURL secondary medium size={sizes.text.label} url={supportedURLOne} title=" правилами сайта " />
          <AppText primary medium size={sizes.text.label}>
            и
          </AppText>
          <AppOpenURL secondary medium size={sizes.text.label} url={supportedURLOne} title=" политикой " />
          <AppOpenURL
            secondary
            medium
            size={sizes.text.label}
            url={supportedURLOne}
            title="обработки персональных данных"
          />
        </Block>
      </Block>
      {/* Button */}
      <AppButton>
        <AppText center medium>
          Завершить регистрацию
        </AppText>
      </AppButton>
      </Block>
    /* </KeyboardAvoidingView> */
  );
}

const styles = StyleSheet.create({});
