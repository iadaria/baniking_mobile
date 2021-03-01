import React from 'react';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { IChangePassword } from '~/src/app/models/settings';
import { defaultSafeInputs } from '../contracts/safeRules';
import { styles } from './styles';

export function SafeScreen() {
  const valuesRef = React.useRef<IChangePassword>({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  function handleChangePassword() {}
  return (
    <Block base>
      <ValidatedElements
        // key={Number(recreate)}
        defaultInputs={defaultSafeInputs}
        valuesRef={valuesRef}>
        <Block margin={[0, 0, 2]}>
          <AppText h1>Безопасность</AppText>
        </Block>
        {/* Form */}
        <AppText style={styles.label} semibold>
          Пароль
        </AppText>
        <AppInput style={styles.input} id="current_password" placeholder="Старный пароль" maxLength={16} secure />
        <AppText style={styles.label} semibold>
          Новый пароль
        </AppText>
        <AppInput style={styles.input} id="new_password" placeholder="Новый пароль" maxLength={16} />
        <AppText style={styles.label} semibold>
          Повторить новый пароль
        </AppText>
        <AppInput style={styles.input} id="new_password_confirmation" placeholder="Новый пароль" maxLength={16} />
        <AppButton onPress={handleChangePassword}>
          <AppText center medium>
            Сохранить изменения
          </AppText>
        </AppButton>
      </ValidatedElements>
    </Block>
  );
}
