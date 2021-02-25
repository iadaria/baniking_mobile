import React, { useEffect, useState } from 'react';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ImagePicker from 'react-native-image-crop-picker';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { connect } from 'react-redux';
import { askLogout as askLogoutAction } from '~/src/features/persist/store/appPersistActions';
import {
  getProfileSettings as getProfileSettingsAction,
  initProfileInputs as initProfileInputsAction,
} from '~/src/features/profiles/store/profileActions';
import { Sex } from '~/src/app/models/profile';
import { styles } from './styles';
import { AvatarIcon } from '~/src/assets';
import { IRootState } from '~/src/app/store/rootReducer';
import { IProfile } from '~/src/app/models/profile';
import { ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { imageOptions } from './imageOptions';
import { USER_IMAGE_PATH } from '~/src/app/common/constants/common';
import { AvatarMenu } from './AvatarMenu';
import { sendProfileSettings as sendProfileSettingsAction } from '~/src/features/profiles/store/profileActions';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { SexSwitch } from './SexSwitch';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { delay } from 'redux-saga/effects';
import { IProfileInputs } from '../contracts/profileInputs';

interface IProps {
  logout: () => void;
  getProfileSettings: () => void;
  currentProfileSettings: IProfile | null;
  loading: boolean;
  initProfileInputs: (profileSettings: IProfile) => void;
  defaultProfileInputs: IProfileInputs;
}

interface IProfileForm {
  email: string;
  name: string;
  surname: string;
  middle_name: string;
  phone: string;
  birth_date: string;
  avatar: string;
}

function ProfileScreenContainer({
  getProfileSettings,
  currentProfileSettings,
  loading,
  initProfileInputs,
  defaultProfileInputs,
}: IProps) {
  const [sex, setSex] = useState<Sex>(Sex.Male);
  const [showMenu, setShowMenu] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const valuesRef = React.useRef<Partial<IProfile>>(currentProfileSettings);

  // const [defaultInput, setDefaultInputs] = useState(defaultBaseSettingsInputs);

  const { email, name, surname, middle_name, phone, birth_date, avatar } =
    (currentProfileSettings as Partial<IProfileForm>) || {};

  const [avatarImage, setAvatarImage] = useState(avatar || USER_IMAGE_PATH);

  function handleSaveSettings(/* avatarImage: string */) {
    sendProfileSettingsAction({});
  }

  useEffect(
    () => {
      console.log('[BaseSettingsScreen/useEffect] getProfileSettings()');
      getProfileSettings();
      delay(8000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /* currentProfileSettings, getProfileSettings */
    ],
  );

  useEffect(() => {
    console.log('currentProfileSettings', currentProfileSettings);
    if (currentProfileSettings) {
      initProfileInputs(currentProfileSettings);
    }
  }, [currentProfileSettings, initProfileInputs]);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera(imageOptions)
      .then((image) => {
        console.log(image);
        setAvatarImage(image.path);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker(imageOptions)
      .then((image) => {
        console.log(image);
        setAvatarImage(image.path);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (loading) {
    return (
      <Block full base>
        <AppText>Loading...</AppText>
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
            value={surname}
            maxLength={50}
            isScrollToFocused
          />

          <AppText style={styles.label} semibold>
            Имя
          </AppText>
          <AppInput
            style={styles.input}
            id="name"
            placeholder="Введите имя"
            value={name}
            maxLength={50}
            isScrollToFocused
          />

          <AppText style={styles.label} semibold>
            Отчество
          </AppText>
          <AppInput
            style={styles.input}
            id="middle_name"
            placeholder="Введите отчество"
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
            value={phone}
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
              source={{ uri: avatarImage }}>
              <AvatarIcon />
            </ImageBackground>
          </TouchableOpacity>

          <AppButton onPress={handleSaveSettings}>
            <AppText center medium>
              Сохранить изменения
            </AppText>
          </AppButton>
          {/* </Block> */}
        </ValidatedElements>
      </ScrollView>
      <>
        {showMenu && (
          <AvatarMenu
            setShowMenu={setShowMenu}
            takePhoto={takePhotoFromCamera}
            choosePhoto={choosePhotoFromLibrary}
          />
        )}
      </>
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

// useEffect(() => {
//   if (currentProfileSettings) {
//     const newDefaultInput = defaultInput;
//     for (const key of Object.keys(defaultInput)) {
//       if (currentProfileSettings.hasOwnProperty(key)) {
//         newDefaultInput[key] = currentProfileSettings[key];
//       }
//     }
//     setDefaultInputs({ ...defaultInput, ...newDefaultInput });
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
