import React from 'react';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { connect } from 'react-redux';
import { askLogout as askLogoutAction } from '~/src/features/persist/store/appPersistActions';
import { styles } from './styles';

/* enum Sex {
  mail = 0,
  femail = 1,
}
 */
interface IProps {
  logout: () => void;
}

function BaseSettingsScreen(props: IProps) {
  // const [sex, setSex] = useState<Sex>(Sex.mail);

  function handleSaveSettings() {
    props.logout();
  }

  return (
    <Block full base debug>
      <Block margin={[0, 0, 2]}>
        <AppText h1>Основные настройки</AppText>
      </Block>
      {/* Form */}

      <AppText style={styles.label} semibold>
        Фамилия
      </AppText>
      <AppInput
        style={styles.input}
        id="surname"
        placeholder="Введите Фамилию"
        maxLength={50}
        defaultValue="Петренко"
      />

      <AppText style={styles.label} semibold>
        Имя
      </AppText>
      <AppInput style={styles.input} id="name" placeholder="Введите Имя" maxLength={50} defaultValue="Александр" />

      <AppText style={styles.label} semibold>
        Отчество
      </AppText>
      <AppInput style={styles.input} id="middle_name" placeholder="Введите Отчество" maxLength={50} />

      <AppText style={styles.label} semibold>
        Дата рождения
      </AppText>
      <AppInput
        style={styles.input}
        id="birth_date"
        placeholder="ДД/ММ/ГГГГ"
        maxLength={50}
        number
        mask="[00]{.}[00]{.}[9900]"
      />

      <AppText style={styles.label} semibold>
        Пол
      </AppText>
      <AppInput style={styles.input} id="sex" placeholder="Введите Пол" maxLength={50} />

      <AppText style={styles.label} semibold>
        Мобильный телефон
      </AppText>
      <AppInput
        style={styles.input}
        id="phone"
        placeholder="+7( _)__-__-__ "
        maxLength={50}
        number
        mask="+[0] ([000]) [000] [00] [00]"
      />

      <AppText style={styles.label} semibold>
        Email
      </AppText>
      <AppInput style={styles.input} id="surname" placeholder="Введите Email" maxLength={50} />

      <AppText style={styles.label} semibold>
        Аватарка
      </AppText>
      <AppInput style={styles.input} id="surname" placeholder="Введите Фамилию" maxLength={50} />

      <Block margin={[0.9, 0]} />

      <AppButton onPress={handleSaveSettings}>
        <AppText center medium>
          Сохранить изменения
        </AppText>
      </AppButton>
    </Block>
  );
}

const BaseSettingsConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    logout: askLogoutAction,
  },
)(BaseSettingsScreen);

export { BaseSettingsConnected as BaseSettingsScreen };
