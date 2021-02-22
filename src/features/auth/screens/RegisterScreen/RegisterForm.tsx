import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
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
  emailRegister: (props: Partial<ICredential>) => void;
}

export default function RegisterForm({ scrollViewRef, emailRegister }: IProps) {
  const [isAccept, setIsAccept] = React.useState<boolean>(true);
  const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<Partial<ICredential>>({ name: '', email: '', phone: '' });
  // const [enableShift, setEnableShift] = React.useState(false);

  async function handleSubmit() {
    const device_name = await DeviceInfo.getDeviceName();
    const data = {
      name: valuesRef.current.name,
      email: valuesRef.current.email,
      phone: valuesRef.current.phone,
      device_name: device_name,
      agreement: isAccept,
    };

    console.log('***** data *******', data);
    emailRegister(data);
    setRecreate(!recreate);
  }

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
      <AppInput id="name" placeholder="Фамилия" center isScrollToFocused />
      {/* Email */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Email
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <AppInput id="email" center email />
      {/* Phone */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Номер телефона
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <AppInput id="phone" center mask="+7([000])[000]-[00]-[00]" isScrollToFocused />
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
      <AppButton disabled={!isAccept} onPress={handleSubmit}>
        <AppText center medium>
          Завершить регистрацию
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
}

const styles = StyleSheet.create({});
