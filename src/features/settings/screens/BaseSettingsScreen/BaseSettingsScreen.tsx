import React, { useEffect, useState } from 'react';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { connect } from 'react-redux';
import { askLogout as askLogoutAction } from '~/src/features/persist/store/appPersistActions';
import { getProfileSettings as getProfileSettingsAction } from '~/src/features/profiles/store/profileActions';
import { Sex } from '~/src/app/models/profile';
import { styles } from './styles';
import { AvatarIcon, FemaleIcon, MaleIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import { IRootState } from '~/src/app/store/rootReducer';
import { IProfile } from '~/src/app/models/profile';
import { ScrollView } from 'react-native';

interface IProps {
  logout: () => void;
  getProfileSettings: () => void;
  currentProfileSettings: IProfile | null;
}

interface IBaseSettingsForm {
  email: string;
  name: string;
  surname: string;
  middle_name: string;
  phone: string;
  birth_date: string;
  avatar: string;
}

function BaseSettingsScreen({ getProfileSettings, currentProfileSettings }: IProps) {
  const [sex, setSex] = useState<Sex>(Sex.Male);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const { email, name, surname, middle_name, phone, birth_date, avatar } =
    (currentProfileSettings as Partial<IBaseSettingsForm>) || {};

  console.log('[BaseSettingsScreen]', currentProfileSettings);

  // return null;

  useEffect(() => {
    console.log('[BaseSettingsScreen/useEffect] getProfileSettings()');
    // getProfileSettings();
  }, [getProfileSettings]);

  function handleSaveSettings() {}

  return (
    <ScrollView
      ref={scrollViewRef}
      // style={styles.scrollView}
      alwaysBounceHorizontal
      //contentContainerStyle={styles.scrollViewContainer}
    >
      <Block full base>
        <Block margin={[0, 0, 2]}>
          <AppText h1>Основные настройки</AppText>
        </Block>
        {/* Form */}

        <AppText style={styles.label} semibold>
          Фамилия
        </AppText>
        <AppInput style={styles.input} id="surname" placeholder="Введите фамилию" value={surname} maxLength={50} />

        <AppText style={styles.label} semibold>
          Имя
        </AppText>
        <AppInput style={styles.input} id="name" placeholder="Введите имя" value={name} maxLength={50} />

        <AppText style={styles.label} semibold>
          Отчество
        </AppText>
        <AppInput
          style={styles.input}
          id="middle_name"
          placeholder="Введите Отчество"
          value={middle_name}
          maxLength={50}
        />

        <AppText style={styles.label} semibold>
          Дата рождения
        </AppText>
        <AppInput
          style={styles.input}
          id="birth_date"
          placeholder="ДД/ММ/ГГГГ"
          value={birth_date}
          maxLength={50}
          number
          mask="[00]{.}[00]{.}[9900]"
        />

        <AppText style={styles.label} semibold>
          Пол
        </AppText>
        <Block margin={[0.6, 0, 1]} row>
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
          value={phone}
          maxLength={50}
          phone
          mask="+7([000])[000]-[00]-[00]"
        />

        <AppText style={styles.label} semibold>
          Email
        </AppText>
        <AppInput style={styles.input} id="surname" value={email} maxLength={50} />

        <AppText style={styles.label} semibold>
          Аватарка
        </AppText>
        <Block margin={[0.5, 0, 2]} style={styles.avatar} center middle debug>
          <AvatarIcon />
        </Block>

        <AppButton onPress={handleSaveSettings}>
          <AppText center medium>
            Сохранить изменения
          </AppText>
        </AppButton>
      </Block>
    </ScrollView>
  );
}

const BaseSettingsConnected = connect(
  ({ auth, profile }: IRootState) => ({
    authenticated: auth.authenticated,
    currentProfileSettings: profile.currentUserProfile,
  }),
  {
    logout: askLogoutAction,
    getProfileSettings: getProfileSettingsAction,
  },
)(BaseSettingsScreen);

export { BaseSettingsConnected as BaseSettingsScreen };
