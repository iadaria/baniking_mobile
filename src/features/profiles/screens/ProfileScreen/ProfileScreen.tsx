import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, Image as RNImage } from 'react-native';
import { AppInput, AppText, Block, AppButton } from '~/src/app/common/components/UI';
import { connect } from 'react-redux';
import { askLogout as askLogoutAction } from '~/src/features/persist/store/appPersistActions';
import {
  getProfileSettings as getProfileSettingsAction,
  initProfileInputs as initProfileInputsAction,
  uploadAvatar as uploadAvatarAction,
  sendProfileSettings as sendProfileSettingsAction,
} from '~/src/features/profiles/store/profileActions';
import { Sex } from '~/src/app/models/profile';
import { IRootState } from '~/src/app/store/rootReducer';
import { IProfile } from '~/src/app/models/profile';
import { AvatarMenu } from './AvatarMenu';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { SexSwitch } from './SexSwitch';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { IProfileInputs } from '../contracts/profileInputs';
import { AvatarIcon } from '~/src/assets';
import { USER_IMAGE_PATH } from '~/src/app/common/constants/common';
import { colors } from '~/src/app/common/constants/colors';
import { styles } from './styles';
import { IUploadAvatar } from '~/src/app/models/profile';

interface IProps {
  logout: () => void;
  getProfileSettings: () => void;
  currentProfileSettings: IProfile | null;
  loading: boolean;
  initProfileInputs: (profileSettings: IProfile) => void;
  defaultProfileInputs: IProfileInputs;
  uploadAvatar: (file: IUploadAvatar) => void;
}

function ProfileScreenContainer({
  getProfileSettings,
  currentProfileSettings,
  loading,
  initProfileInputs,
  defaultProfileInputs,
  uploadAvatar,
}: IProps) {
  const [sex, setSex] = useState<Sex>(Sex.Male);
  const [showMenu, setShowMenu] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const valuesRef = React.useRef<Partial<IProfile>>(currentProfileSettings);
  const [avatarImage, setAvatarImage] = useState<IUploadAvatar>({
    file: USER_IMAGE_PATH,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    mime: 'image/jpeg',
    size: 1000,
  });

  const { email } = currentProfileSettings || {};

  function handleSaveSettings() {
    uploadAvatar(avatarImage);
  }

  useEffect(() => {
    // console.log('[BaseSettingsScreen/useEffect] getProfileSettings()'); // del
    getProfileSettings();
  }, [getProfileSettings]);

  useEffect(() => {
    if (currentProfileSettings) {
      initProfileInputs(currentProfileSettings);
      RNImage.getSize(currentProfileSettings.avatar, (width: number, height: number) => {
        setAvatarImage({
          ...avatarImage,
          file: currentProfileSettings.avatar,
          width,
          height,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfileSettings, initProfileInputs]);

  useEffect(() => {
    // console.log('[ProfileScreen/useEffect] avatarImage=', avatarImage);
  }, [avatarImage]); // del

  if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  }

  return (
    <KeyboardWrapper>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        alwaysBounceHorizontal
        contentContainerStyle={styles.scrollViewContainer}>
        <ValidatedElements
          // key={Number(recreate)}
          initInputs={currentProfileSettings}
          defaultInputs={defaultProfileInputs}
          scrollView={scrollViewRef}
          valuesRef={valuesRef}
          nameForm="BaseSettings">
          {/* <Block full base> */}
          <Block margin={[0, 0, 2]}>
            <AppText h1>Основные настройки</AppText>
          </Block>
          {/* Test */}
          <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={() => handleSaveSettings()}>
            <AppText>Upload</AppText>
          </TouchableOpacity>
          {/* Form */}
          <AppText style={styles.label} semibold>
            Фамилия
          </AppText>
          <AppInput
            style={styles.input}
            id="surname"
            placeholder="Введите фамилию"
            maxLength={50}
            isScrollToFocused
          />

          <AppText style={styles.label} semibold>
            Имя
          </AppText>
          <AppInput style={styles.input} id="name" placeholder="Введите имя" maxLength={50} isScrollToFocused />

          <AppText style={styles.label} semibold>
            Отчество
          </AppText>
          <AppInput style={styles.input} id="middle_name" placeholder="Введите отчество" maxLength={50} />

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
            isScrollToFocused
          />

          <AppText style={styles.label} semibold>
            Пол
          </AppText>
          <SexSwitch sex={sex} setSex={setSex} />

          <AppText style={styles.label} semibold>
            Мобильный телефон
          </AppText>
          <AppInput
            style={styles.input}
            id="phone"
            placeholder="+7(___)___-__-__"
            maxLength={50}
            phone
            mask="+7([000])[000]-[00]-[00]"
            isScrollToFocused
          />

          <AppText style={styles.label} semibold>
            Email
          </AppText>
          <AppInput // id="email"
            style={styles.input}
            editable={false}
            placeholder="Введите email"
            value={email}
            maxLength={50}
          />

          <AppText style={styles.label} semibold>
            Аватарка
          </AppText>
          <TouchableOpacity style={styles.avatar} onPress={setShowMenu.bind(null, true)}>
            <ImageBackground
              style={styles.avatarImage}
              imageStyle={{ borderRadius: 50 }}
              source={{ uri: avatarImage.file }}>
              <AvatarIcon />
            </ImageBackground>
          </TouchableOpacity>

          <AppButton onPress={handleSaveSettings}>
            <AppText center medium>
              Сохранить изменения
            </AppText>
          </AppButton>
        </ValidatedElements>
      </ScrollView>
      <>{showMenu && <AvatarMenu setShowMenu={setShowMenu} setAvatarImage={setAvatarImage} />}</>
    </KeyboardWrapper>
  );
}

const ProfileConnected = connect(
  ({ auth, profile }: IRootState) => ({
    authenticated: auth.authenticated,
    currentProfileSettings: profile.currentUserProfile,
    loading: profile.loading,
    defaultProfileInputs: profile.inputs.settings,
  }),
  {
    logout: askLogoutAction,
    getProfileSettings: getProfileSettingsAction,
    sendProfileSettings: sendProfileSettingsAction,
    initProfileInputs: initProfileInputsAction,
    uploadAvatar: uploadAvatarAction,
  },
)(ProfileScreenContainer);

export { ProfileConnected as ProfileScreen };

/* const data = new FormData();
const coordinates = {
  width: 10,
  height: 10,
  top: 10,
  left: 10,
};
data.append('coordinates', coordinates);
data.append('file', {
  uri: avatarImage,
  name: 'userProfile.jpg',
  type: 'image/jpg',
});
methods
  .uploadAvatar(data, null)
  .then((answer) => console.log(answer))
  .catch((e) => console.log(e)); */
