import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { CloseWhiteIcon } from '~/src/assets';
import { styles } from './styles';
import { IUploadAvatar, TAcceptTypeAvatar } from '~/src/app/models/profile';
import { choosePhotoFromLibrary, takePhotoFromCamera } from './appImagePicker';
import { Image } from 'react-native-image-crop-picker';
import { isAllowedImageType } from '~/src/app/utils/system';
import { showAlert } from '~/src/app/common/components/showAlert';

const MAX_SIZE = 10 * 1024 * 1024;

interface IProps {
  setShowMenu: (state: boolean) => void;
  setAvatarImage: Dispatch<SetStateAction<IUploadAvatar>>;
  setAvatarIsChanged: Dispatch<SetStateAction<boolean>>;
}

export const AvatarMenu = ({ setShowMenu, setAvatarImage, setAvatarIsChanged }: IProps) => {
  async function takePhoto() {
    try {
      const image = await takePhotoFromCamera();
      updateAvatarState(image);
    } catch (e) {
      console.log(e);
    }
    setShowMenu(false);
  }

  async function choosePhoto() {
    try {
      const image = await choosePhotoFromLibrary();
      console.log('photo', JSON.stringify(image, null, 2));
      updateAvatarState(image);
    } catch (e) {
      console.log(e);
    }
    setShowMenu(false);
  }

  const updateAvatarState = (image: Image) => {
    /* if (!isAllowedImageType(image.mime)) {
      showAlert(
        'Сообщение',
        'Вы выбрали недопустимый формат изображения, разрешенные форматы: jpeg/jpg, gif, png',
      );
      return;
    }

    if (image.size > MAX_SIZE) {
      showAlert('Сообщение', 'Вы выбрали недопустимый размер файла, размер файлы не должен привышать 10 Mбайт');
      return;
    } */

    setAvatarImage({
      file: image.path,
      height: 400, //image.cropRect?.height!,
      width: 400, //image.cropRect?.width!,
      top: 0, //image.cropRect?.x!,
      left: 0, //image.cropRect?.y!,
      mime: image.mime as TAcceptTypeAvatar,
      size: image.size,
    });
    setAvatarIsChanged(true);
  };

  return (
    <Block style={styles.avatarMenu}>
      <TouchableOpacity style={styles.avatarCloseIcon} onPress={setShowMenu.bind(null, false)}>
        <CloseWhiteIcon />
      </TouchableOpacity>
      <AppButton style={styles.avatarMenuItem} onPress={async () => await choosePhoto()}>
        <AppText primary medium>
          Загрузить из галереи
        </AppText>
      </AppButton>
      <AppButton style={styles.avatarMenuItem} onPress={async () => await takePhoto()}>
        <AppText primary medium>
          Сфотографировать
        </AppText>
      </AppButton>
      <AppButton
        style={[styles.avatarMenuItem, styles.delete]}
        onPress={() => console.log('Download from gallery')}>
        <AppText medium>Удалить фотографию</AppText>
      </AppButton>
    </Block>
  );
};
