import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText, Block, AppInput } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AuthLogoLeft, AuthLogoRight, NecessaryIcon } from '~/src/assets';
import { CompleteRegisterPayload } from '../../store/saga/registerCompleteSaga';
import { RestorePasswordPayload } from '../../store/saga/restorePasswordSaga';
import { IRegisterCompleteInputs } from '../contracts/registerCompleteInputs';
import { IRootState } from '~/src/app/store/rootReducer';
import {
  registerComplete as reigsterCompleteAction,
  restorePassword as restorePasswordAction,
} from '~/src/features/auth/store/authActions';
import { IErrors } from '~/src/app/utils/error';
import { Action, sizes } from '~/src/app/common/constants';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  scrollViewRef?: React.RefObject<ScrollView>;
  navigation: StackNavigationProp<ParamListBase>;
  registerComplete: (payload: CompleteRegisterPayload) => void;
  restorePassword: (payload: RestorePasswordPayload) => void;
  defaultRegisterCompleteIntpus: IRegisterCompleteInputs;
  action: Action;
  errors: IErrors | null;
}

export function RegisterCompleteFormContainter({
  scrollViewRef,
  registerComplete,
  restorePassword,
  defaultRegisterCompleteIntpus,
  action,
  errors,
}: IProps) {
  const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<CompleteRegisterPayload>();

  useEffect(() => {
    logline(
      '[RegisterCompleteScreen] defaultInputs',
      defaultRegisterCompleteIntpus,
    );
  }, [defaultRegisterCompleteIntpus]);

  async function handleSubmit() {
    if (valuesRef.current) {
      const data = {
        ...valuesRef.current,
      };
      if (action === Action.Registration) {
        registerComplete(data);
      }
      if (action === Action.Password) {
        restorePassword(data);
      }
      setRecreate(!recreate);
    }
  }

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultRegisterCompleteIntpus}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}
      errors={errors}>
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
      <AppInput
        style={{ borderRadius: 10 }}
        id="password"
        placeholder="Введите пароль"
        maxLength={50}
        secure
        center
      />
      <Block row middle center>
        <AppText semibold primary size={sizes.text.label} spacing={-0.4}>
          Подверждение пароля
        </AppText>
        <NecessaryIcon style={{ marginHorizontal: 3 }} />
      </Block>
      <AppInput
        style={{ borderRadius: 10 }}
        id="password_confirmation"
        placeholder="Введите пароль"
        maxLength={50}
        secure
        center
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
    defaultRegisterCompleteIntpus: auth.inputs.registerComplete,
    errors: auth.errors,
  }),
  {
    registerComplete: reigsterCompleteAction,
    restorePassword: restorePasswordAction,
  },
)(RegisterCompleteFormContainter);

export { RegisterCompleteFormConnected as RegisterCompleteForm };
