import React from 'react';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { BackButton } from '~/src/app/common/components/BackButton';
import { styles as s } from './styles';
import { MenuItem, PageIcon } from '~/src/assets';
import { TouchableOpacity } from 'react-native';

export default function CityScreen() {
  return (
    <Block margin={6} full>
      <BackButton screen="BathesScreen" />

      <AppText margin={[4, 0]} h1>
        Город
      </AppText>
      {/* Form */}
      <Block padding={[5, 4]} style={s.form}>
        <AppText primary medium>
          Выберите город из списка
        </AppText>

        <Block
          style={s.item}
          padding={[2, 3]}
          margin={[2, 0]}
          row
          center
          space="between">
          <AppText primary semibold size={4}>
            Moscow
          </AppText>
          <MenuItem />
        </Block>

        <AppButton>
          <AppText medium center size={4}>
            Определить мое местоположение
          </AppText>
        </AppButton>
      </Block>

      <TouchableOpacity style={[s.form, s.nealy]}>
        <AppText primary medium>
          Показать все бани рядом со мной
        </AppText>
        <PageIcon />
      </TouchableOpacity>
    </Block>
  );
}
