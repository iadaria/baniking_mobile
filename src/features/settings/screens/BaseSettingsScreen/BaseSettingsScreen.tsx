import React, { useEffect, useState } from 'react';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ImagePicker from 'react-native-image-crop-picker';
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
import { ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { imageOptions } from './imageOptions';
import { USER_IMAGE_PATH } from '~/src/app/common/constants/common';
import { AvatarMenu } from './AvatarMenu';

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
  const [showMenu, setShowMenu] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const { email, name, surname, middle_name, phone, birth_date, avatar } =
    (currentProfileSettings as Partial<IBaseSettingsForm>) || {};

  const [avatarImage, setAvatarImage] = useState(avatar || USER_IMAGE_PATH);

  console.log('userImg', avatarImage);
  console.log('[BaseSettingsScreen]', currentProfileSettings);

  function handleSaveSettings(/* avatarImage: string */) {
    
  }

  useEffect(() => {
    console.log('[BaseSettingsScreen/useEffect] getProfileSettings()');
    // getProfileSettings();
  }, [getProfileSettings]);

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

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
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
          <AppInput
            style={styles.input}
            id="surname"
            placeholder="Введите фамилию"
            value={surname}
            maxLength={50}
          />

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
          />

          <AppText style={styles.label} semibold>
            Пол
          </AppText>
          <Block margin={[0.6, 0, 1]} row>
            <AppButton
              style={[styles.sex, sex !== Sex.Male && styles.sexPassive]}
              onPress={() => setSex(Sex.Male)}>
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
            placeholder="+7(___)___-__-__"
            value={phone}
            maxLength={50}
            phone
            mask="+7([000])[000]-[00]-[00]"
          />

          <AppText style={styles.label} semibold>
            Email
          </AppText>
          <AppInput style={styles.input} id="email" placeholder="Введите email" value={email} maxLength={50} />

          <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={() => handleSaveSettings(avatarImage)}>
            <AppText>Upload</AppText>
          </TouchableOpacity>

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
        </Block>
      </ScrollView>
      {showMenu && (
        <AvatarMenu
          setShowMenu={setShowMenu}
          takePhoto={takePhotoFromCamera}
          choosePhoto={choosePhotoFromLibrary}
        />
      )}
    </>
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