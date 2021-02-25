import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { CloseWhiteIcon } from '~/src/assets';
import { styles } from './styles';
import { IUploadAvatar, TAcceptTypeAvatar } from '~/src/app/models/profile';
import { choosePhotoFromLibrary, takePhotoFromCamera } from './appImagePicker';
import { Image } from 'react-native-image-crop-picker';

interface IProps {
  setShowMenu: (state: boolean) => void;
  /* takePhoto: () => void;
  choosePhoto: () => void; */
  setAvatarImage: Dispatch<SetStateAction<IUploadAvatar>>;
}

export const AvatarMenu = ({ setShowMenu, setAvatarImage }: IProps) => {
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
      console.log('photo', image);
      updateAvatarState(image);
    } catch (e) {
      console.log(e);
    }
    setShowMenu(false);
  }

  const updateAvatarState = (image: Image) =>
    setAvatarImage({
      file: image.path,
      height: image.cropRect?.height!,
      width: image.cropRect?.width!,
      top: image.cropRect?.x!,
      left: image.cropRect?.y!,
      mime: image.mime as TAcceptTypeAvatar,
      size: image.size,
    });

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
