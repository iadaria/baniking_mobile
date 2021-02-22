import React, { useState } from 'react';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { connect } from 'react-redux';
import { askLogout as askLogoutAction } from '~/src/features/persist/store/appPersistActions';
import { Sex } from '~/src/app/models/profile';
import { styles } from './styles';
import { FemaleIcon, MaleIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';

interface IProps {
  logout: () => void;
}

function BaseSettingsScreen(props: IProps) {
  const [sex, setSex] = useState<Sex>(Sex.Male);

  function handleSaveSettings() {
    props.logout();
  }

  const changeSex = () => (sex === Sex.Male ? Sex.Female : Sex.Male);

  return (
    <Block full base debug>
      <Block margin={[0, 0, 2]}>
        <AppText h1>Основные настройки</AppText>
      </Block>
      {/* Form */}

      <AppText style={styles.label} semibold>
        Фамилия
      </AppText>
      <AppInput style={styles.input} id="surname" placeholder="Введите фамилию" maxLength={50} />

      <AppText style={styles.label} semibold>
        Имя
      </AppText>
      <AppInput style={styles.input} id="name" placeholder="Введите имя" maxLength={50} />

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

      {/* <AppText style={styles.label} semibold>
        Пол
      </AppText>
      <AppInput style={styles.input} id="sex" placeholder="Введите Пол" maxLength={50} /> */}
      <Block row debug>
        <AppButton style={[styles.sex, sex !== Sex.Male && styles.sexPassive]} onPress={() => setSex(Sex.Male)}>
          <MaleIcon />
          <Block margin={[0, sizes.offset.between]} />
          <AppText bold center>
            Мужское
          </AppText>
        </AppButton>
        <Block margin={[0, sizes.offset.between / 2]} />
        <AppButton
          style={[styles.sex, sex !== Sex.Female && styles.sexPassive]}
          onPress={() => setSex(Sex.Female)}>
          <FemaleIcon />
          <Block margin={[0, sizes.offset.between]} />
          <AppText bold center>
            Женское
          </AppText>
        </AppButton>
      </Block>

      <AppText style={styles.label} semibold>
        Мобильный телефон
      </AppText>
      <AppInput
        style={styles.input}
        id="phone"
        placeholder="+7(__)__-__-__ "
        maxLength={50}
        phone
        mask="+7([000])[000]-[00]-[00]"
      />

      <AppText style={styles.label} semibold>
        Email
      </AppText>
      <AppInput style={styles.input} id="surname" maxLength={50} />

      <AppText style={styles.label} semibold>
        Аватарка
      </AppText>
      <AppInput style={styles.input} id="avatar" maxLength={50} />

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
