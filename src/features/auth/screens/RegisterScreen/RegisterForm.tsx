import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  AppChecker,
  AppInput,
  AppOpenURL,
  AppText,
  Block,
} from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { ICredential } from '~/src/app/models/user';
import { IErrors } from '~/src/app/utils/error';
import { AuthLogoLeft, AuthLogoRight, NecessaryIcon } from '~/src/assets';
import { defaultRegisterInputs } from '../contracts/registerInputs';
import { sizes } from '~/src/app/common/constants';
import { log } from '~/src/app/utils/debug';
import { Input } from '~/src/app/common/components/UI/Input';

const supportedURLOne = 'https://google.com';
// const unsupportedURL = 'slack://open?team=123456';

interface IProps {
  // navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  phoneRegister: (props: Partial<ICredential>) => void;
  scrollPosition?: number;
  errors: IErrors | null;
}

const AgreementText = () => (
  <Block row wrap margin={[0, 0, 0, 2]}>
    <AppText primary medium size={sizes.text.label}>
      Я согласен с
    </AppText>
    <AppOpenURL
      secondary
      medium
      size={sizes.text.label}
      url={supportedURLOne}
      title=" правилами сайта "
    />
    <AppText primary medium size={sizes.text.label}>
      и
    </AppText>
    <AppOpenURL
      secondary
      medium
      size={sizes.text.label}
      url={supportedURLOne}
      title=" политикой "
    />
    <AppOpenURL
      secondary
      medium
      size={sizes.text.label}
      url={supportedURLOne}
      title="обработки персональных данных"
    />
  </Block>
);

export default function RegisterForm({
  scrollViewRef,
  phoneRegister,
  scrollPosition,
  errors,
}: IProps) {
  const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<Partial<ICredential>>({
    name: '',
    email: '',
    phone: '',
    agreement: true,
  });
  // const [enableShift, setEnableShift] = React.useState(false);

  async function handleSubmit() {
    const device_name = await DeviceInfo.getDeviceName();
    const data = {
      name: valuesRef.current.name,
      email: valuesRef.current.email,
      phone: valuesRef.current.phone,
      device_name: device_name,
      agreement: valuesRef.current.agreement,
    };

    log('***** data *******', data);
    phoneRegister(data);
    setRecreate(!recreate);
  }

  return (
    <ValidatedElements
      //key={Number(recreate)}
      defaultInputs={defaultRegisterInputs}
      scrollView={scrollViewRef}
      scrollPosition={scrollPosition}
      valuesRef={valuesRef}
    //errors={errors}
    >
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
      <Input
        style={{ borderRadius: 10 /* , paddingLeft: wp(30) */ }}
        id="name"
        placeholder="Введите имя"
        maxLength={16}
        //isScrollToFocused
        center
      />
      {/* Email */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Email
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <Input
        style={{ borderRadius: 10 /* , paddingLeft: wp(28)  */ }}
        id="email"
        placeholder="Введите email"
        center
        email
        maxLength={50}
      />
      {/* Phone */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Номер телефона
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <Input
        style={{ borderRadius: 10, paddingLeft: wp(25) }}
        id="phone"
        placeholder="+7(___)___-__-__   "
        mask="+7([000])[000]-[00]-[00]"
        phone
        isScrollToFocused
      />
      {/* Accept */}
      <AppChecker id="agreement" text={<AgreementText />} />

      {/* Button */}
      <AppButton onPress={handleSubmit}>
        <AppText center medium>
          Завершить регистрацию
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
}
