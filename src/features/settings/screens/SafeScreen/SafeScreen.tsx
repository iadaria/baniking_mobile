import React from 'react';
import {
  AppButton,
  AppInput,
  AppText,
  Block,
} from '~/src/app/common/components/UI';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { changePassword as changePasswordAction } from '~/src/features/settings/store/settingsActions';
import { IChangePassword } from '~/src/app/models/settings';
import { defaultSafeInputs } from '../contracts/safeRules';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles } from './styles';
import { connect } from 'react-redux';
import { IErrors } from '~/src/app/utils/error';
import { Header } from '~/src/app/common/components/Header';

interface IProps {
  changePassword: (payload: IChangePassword) => void;
  errors: IErrors | null;
}

function SafeScreenContainer({ changePassword, errors }: IProps) {
  // const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<IChangePassword>({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  function handleChangePassword() {
    if (valuesRef?.current) {
      changePassword({ ...valuesRef.current });
      // setRecreate(!recreate);
    }
  }
  return (
    <Block base>
      <Header iconKind="backward" />
      <ValidatedElements
        // key={Number(recreate)}
        defaultInputs={defaultSafeInputs}
        valuesRef={valuesRef}
        errors={errors}>
        <Block margin={[0, 0, 1]}>
          <AppText h1>Безопасность</AppText>
        </Block>
        {/* Form */}
        <AppText style={styles.label} semibold>
          Пароль
        </AppText>
        <AppInput
          style={styles.input}
          id="current_password"
          placeholder="Старный пароль"
          maxLength={16}
          secure
        />
        <AppText style={styles.label} semibold>
          Новый пароль
        </AppText>
        <AppInput
          style={styles.input}
          id="new_password"
          placeholder="Новый пароль"
          maxLength={16}
        />
        <AppText style={styles.label} semibold>
          Повторить новый пароль
        </AppText>
        <AppInput
          style={styles.input}
          id="new_password_confirmation"
          // equalTo="new_password"
          // errorMessage="Значение должно совпадать с новым паролем"
          placeholder="Новый пароль"
          maxLength={16}
        />
        <AppButton style={{ marginTop: 10 }} onPress={handleChangePassword}>
          <AppText center medium>
            Изменить пароль
          </AppText>
        </AppButton>
      </ValidatedElements>
    </Block>
  );
}

const SafeConnected = connect(
  ({ settings }: IRootState) => ({
    errors: settings.errors,
  }),
  {
    changePassword: changePasswordAction,
  },
)(SafeScreenContainer);

export { SafeConnected as SafeScreen };
