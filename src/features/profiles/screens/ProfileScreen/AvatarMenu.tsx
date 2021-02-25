import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { CloseWhiteIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  setShowMenu: (state: boolean) => void;
  takePhoto: () => void;
  choosePhoto: () => void;
}

export const AvatarMenu = ({ setShowMenu, takePhoto, choosePhoto }: IProps) => {
  return (
    <Block style={styles.avatarMenu}>
      <TouchableOpacity style={styles.avatarCloseIcon} onPress={setShowMenu.bind(null, false)}>
        <CloseWhiteIcon />
      </TouchableOpacity>
      <AppButton style={styles.avatarMenuItem} onPress={() => choosePhoto()}>
        <AppText primary medium>
          Загрузить из галереи
        </AppText>
      </AppButton>
      <AppButton style={styles.avatarMenuItem} onPress={() => takePhoto()}>
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
