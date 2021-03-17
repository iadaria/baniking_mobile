import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { AppInput, AppText, Block, AppButton } from '~/src/app/common/components/UI';
import { connect } from 'react-redux';
import { askLogout as askLogoutAction } from '~/src/features/persist/store/appPersistActions';
import {
  getProfileSettings as getProfileSettingsAction,
  initProfileInputs as initProfileInputsAction,
  uploadAvatar as uploadAvatarAction,
  sendProfileSettings as sendProfileSettingsAction,
} from '~/src/features/profiles/store/profileActions';
import { Sex, TAcceptTypeAvatar } from '~/src/app/models/profile';
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
import { getImageExtension } from '~/src/app/utils/system';
import { IErrors } from '~/src/app/utils/error';

interface IProps {
  logout: () => void;
  getProfile: () => void;
  currentProfile: IProfile | null;
  loading: boolean;
  initProfileInputs: (profileSettings: IProfile) => void;
  defaultProfileInputs: IProfileInputs;
  sendProfile: (profileSettings: Partial<IProfile>) => void;
  uploadAvatar: (file: IUploadAvatar) => void;
  errors: {
    profile: IErrors | null;
    avatar: IErrors | null;
  };
}

function ProfileScreenContainer({
  getProfile,
  currentProfile,
  loading,
  initProfileInputs,
  defaultProfileInputs,
  sendProfile,
  uploadAvatar,
  errors,
}: IProps) {
  const [showMenu, setShowMenu] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const valuesRef = React.useRef<Partial<IProfile>>(currentProfile);
  const [avatarIsChanged, setAvatarIsChaned] = useState<boolean>(false); // TOOD false
  const [avatarImage, setAvatarImage] = useState<IUploadAvatar>({
    file: currentProfile?.avatar || USER_IMAGE_PATH,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    mime: 'image/jpeg',
    size: 1000,
  });

  const { email, sex: initSex } = currentProfile || {};
  const [sex, setSex] = useState<Sex>(initSex!);

  function handleSaveSettings() {
    console.log('******** current values', valuesRef);
    if (valuesRef?.current) {
      sendProfile({
        name: valuesRef.current?.name,
        surname: valuesRef.current?.surname,
        middle_name: valuesRef.current?.middle_name,
        phone: valuesRef.current?.phone,
        birth_date: valuesRef.current?.birth_date,
        sex: sex,
      });
    }
    if (avatarIsChanged) {
      console.log('avatar changed **** ');
      uploadAvatar(avatarImage);
    }
  }

  useEffect(() => {
    // console.log('[BaseSettingsScreen/useEffect] getProfileSettings()'); // del
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (currentProfile) {
      initProfileInputs(currentProfile);
      setSex(currentProfile.sex);
      console.log('currentPfoieSettings', JSON.stringify(currentProfile, null, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfile, initProfileInputs]);

  useEffect(() => {
    if (currentProfile?.avatar) {
      console.log('ProfileScreen/useEffect/curreProfile] set image');
      const _image = currentProfile.avatar;
      Image.getSize(_image, (width: number, height: number) => {
        setAvatarImage({
          ...avatarImage,
          ...{
            file: _image,
            width,
            height,
            top: 0,
            left: 0,
            mime: getImageExtension(_image) as TAcceptTypeAvatar,
            size: 100000,
          },
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfile?.avatar]);

  useEffect(() => {
    console.log('[ProfileScreen/useEffect/currentProfile] avatarImage=', JSON.stringify(avatarImage, null, 2));
  }, [avatarImage]);

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
          defaultInputs={defaultProfileInputs}
          scrollView={scrollViewRef}
          valuesRef={valuesRef}
          nameForm="BaseSettings"
          errors={errors.profile}>
          {/* <Block full base> */}
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
            maxLength={50}
            textFocus
            isScrollToFocused
          />

          <AppText style={styles.label} semibold>
            Имя
          </AppText>
          <AppInput
            style={styles.input}
            id="name"
            placeholder="Введите имя"
            maxLength={50}
            textFocus
            isScrollToFocused
          />

          <AppText style={styles.label} semibold>
            Отчество
          </AppText>
          <AppInput
            style={styles.input}
            id="middle_name"
            placeholder="Введите отчество"
            maxLength={50}
            textFocus
          />

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
            textFocus
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
            textFocus
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
            textFocus
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
      <>
        {showMenu && (
          <AvatarMenu
            setShowMenu={setShowMenu}
            setAvatarImage={setAvatarImage}
            setAvatarIsChanged={setAvatarIsChaned}
          />
        )}
      </>
    </KeyboardWrapper>
  );
}

const ProfileConnected = connect(
  ({ auth, profile }: IRootState) => ({
    authenticated: auth.authenticated,
    currentProfile: profile.currentUserProfile,
    loading: profile.loading,
    defaultProfileInputs: profile.inputs.settings,
    errors: profile.errors,
  }),
  {
    logout: askLogoutAction,
    getProfile: getProfileSettingsAction,
    sendProfile: sendProfileSettingsAction,
    initProfileInputs: initProfileInputsAction,
    uploadAvatar: uploadAvatarAction,
  },
)(ProfileScreenContainer);

export { ProfileConnected as ProfileScreen };
