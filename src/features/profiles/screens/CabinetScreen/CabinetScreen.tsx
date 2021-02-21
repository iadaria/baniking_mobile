import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import { colors, sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight, ColumnIcon, userImg } from '~/src/assets';
import ProgressBar from '~/src/app/common/components/UI/AppProgress';
import { styles } from './styles';

export function CabinetScreen() {
  return (
    <Block full base>
      <AppText h1>Личный кабинет</AppText>
      {/* Name & Avatar block */}
      <Block flex={0.8} /* margin={[7, 0, 12]}  */ middle>
        <Block margin={[0, 0, 2]} style={styles.avatarBorder}>
          <Image style={styles.avatar} source={userImg} />
        </Block>
        <AppText center trajan size={sizes.profile.name} color={colors.profile.name}>
          Андрей
        </AppText>
        <AppText center trajan size={sizes.profile.name} color={colors.profile.name} height={30}>
          Немиров
        </AppText>
        <Block margin={[1, 0]} row middle center>
          <AuthLogoLeft />
          <AppText style={{ marginHorizontal: 15 }} h2 trajan transform="uppercase">
            Магистр
          </AppText>
          <AuthLogoRight />
        </Block>
      </Block>
      {/* Progress step  block */}
      <Divider />
      <Block middle>
        <AppText center>Статус</AppText>
        <Block margin={[3, 0]}>
          <ProgressBar completed={33.33} />
        </Block>
      </Block>
      {/* Metting header block */}
      <Block margin={[7, 0, 0]} row middle>
        <TouchableOpacity
          onPress={() => {
            console.log('naviation to 10 mettings');
          }}>
          <AppText center light secondary>
            {'еще 10 собраний '}
          </AppText>
        </TouchableOpacity>
        <AppText center light>
          до следующего уровня
        </AppText>
      </Block>
      {/* Column block */}
      <Block flex={0.2} margin={[0, 0, 1]} center bottom>
        <ColumnIcon />
      </Block>
    </Block>
  );
}
