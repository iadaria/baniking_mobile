import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppInput, AppOpenURL, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { colors, sizes } from '~/src/app/common/constants';
import { ICredential } from '~/src/app/models/user';
import { AuthLogoLeft, AuthLogoRight, NecessaryIcon, SwitcherIcon } from '~/src/assets';
import { defaultRegisterInputs } from '../contracts/registerInputs';

const supportedURLOne = 'https://google.com';
// const unsupportedURL = 'slack://open?team=123456';

interface IProps {
  // navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  // socialLogin: ({ provider }: ICredential) => void;
  // emailLogin: ({ login, password }: Partial<ICredential>) => void;
}

export default function RegisterForm({ scrollViewRef }: IProps) {
  const [isAccept, setIsAccept] = React.useState<boolean>(true);
  const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<Partial<ICredential>>({ first_name: '', email: '', phone: '' });
  // const [enableShift, setEnableShift] = React.useState(false);

  function handleSubmit() {}

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultRegisterInputs}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}>
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
      <AppInput id="first_name" placeholder="Фамилия" center isScrollToFocused />
      {/* Email */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Email
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <AppInput id="email" center isScrollToFocused />
      {/* Phone */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Номер телефона
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <AppInput id="phone" center mask="+7 ([000]) [000] [00] [00]" isScrollToFocused />
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
      <AppButton onPress={handleSubmit}>
        <AppText center medium>
          Завершить регистрацию
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
}

const styles = StyleSheet.create({});
