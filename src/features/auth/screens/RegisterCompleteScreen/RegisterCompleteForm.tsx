import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Input, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AuthLogoLeft, AuthLogoRight, NecessaryIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import { log, logline } from '~/src/app/utils/debug';
import { CompleteRegisterPayload } from '../../store/saga/registerCompleteSaga';
import { IRegisterCompleteInputs } from '../contracts/registerCompleteInputs';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
  registerComplete as reigsterCompleteAction,
  initRegisterCompleteInputs as initRegisterCompleteAction,
} from '~/src/features/auth/store/authActions';
import { IErrors } from '~/src/app/utils/error';

interface IProps {
  scrollViewRef?: React.RefObject<ScrollView>;
  navigation: StackNavigationProp<ParamListBase>;
  registerComplete: (payload: CompleteRegisterPayload) => void;
  initRegisterCompleteInputs: (values: CompleteRegisterPayload) => void;
  defaultRegisterCompleteIntpus: IRegisterCompleteInputs;
  currentUser: Partial<IUserAuth> | null;
  errors: IErrors | null;
}

const emptyPayload = {
  phone: '',
  password: '',
  password_confirmation: '',
  device_name: '',
};

export function RegisterCompleteFormContainter({
  scrollViewRef,
  navigation,
  registerComplete,
  defaultRegisterCompleteIntpus,
  initRegisterCompleteInputs,
  currentUser,
  errors,
}: IProps) {
  const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<CompleteRegisterPayload>(emptyPayload);

  useEffect(() => {
    if (currentUser) {
      logline('', { currentUser });
      initRegisterCompleteInputs({
        ...emptyPayload,
        phone: currentUser.phone!,
      });
    }
  }, [currentUser, initRegisterCompleteInputs]);

  async function handleSubmit() {
    const device_name = await DeviceInfo.getDeviceName();
    const data = {
      ...valuesRef.current,
      device_name: device_name,
    };
    registerComplete(data);
    setRecreate(!recreate);
  }

  return (
    <ValidatedElements
      //key={Number(recreate)}
      defaultInputs={defaultRegisterCompleteIntpus}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}
      errors={errors}
    >
      <Block margin={[0, 0, 2]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Генерация пароля
        </AppText>
        <AuthLogoRight />
      </Block>
      <Block row middle center>
        <AppText semibold primary size={sizes.text.label} spacing={-0.4}>
          Пароль
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <Input
        style={{ borderRadius: 10 /* paddingLeft: wp(30) */ }}
        id="password"
        placeholder="Введите пароль"
        maxLength={50}
        secure
      />
      <Block row middle center>
        <AppText semibold primary size={sizes.text.label} spacing={-0.4}>
          Подверждение пароля
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <Input
        style={{ borderRadius: 10 /* paddingLeft: wp(30) */ }}
        id="password_confirmation"
        placeholder="Введите пароль"
        maxLength={50}
        secure
      />

      {/* Button */}
      <AppButton margin={[1, 0, 2]} onPress={handleSubmit}>
        <AppText center medium>
          Сохранить пароль
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
}

const RegisterCompleteFormConnected = connect(
  ({ auth }: IRootState) => ({
    currentUser: auth.currentUser,
    defaultRegisterCompleteIntpus: auth.inputs.registerComplete,
    errors: auth.errors,
    //errors: auth.errors,
  }),
  {
    registerComplete: reigsterCompleteAction,
    initRegisterCompleteInputs: initRegisterCompleteAction,
  },
)(RegisterCompleteFormContainter);

export { RegisterCompleteFormConnected as RegisterCompleteForm };
