import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import { colors, sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight, userImg } from '~/src/assets';
import ProgressBar from '../../../app/common/components/UI/AppProgress';

const SIZE_AVATAR = 20;

export function ProfileScreen() {
  return (
    <Block full base debug>
      <AppText h1>Личный кабинет</AppText>
      <Block margin={[7, 0, 12]} middle debug>
        <Block margin={[0, 0, 2]} style={styles.avatarBorder}>
          <Image style={styles.avatar} source={userImg} />
        </Block>
        <AppText center trajan secondary size={sizes.profile.name} style={{ color: 'green' }}>
          Андрей
        </AppText>
        <AppText center trajan secondary size={sizes.profile.name} height={30}>
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
      {/* Progress step */}
      <Divider />
      <Block middle debug>
        <AppText center>Статус</AppText>
        <Block margin={[3, 0]}>
          <ProgressBar completed={33.33} bgcolor={colors.secondary} />
        </Block>
      </Block>
      <Block margin={[7, 0]}>
        <AppText center>еще 10 собраний до следующего уровня</AppText>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  avatarBorder: {
    borderWidth: 0.5,
    borderColor: colors.secondary,
    borderRadius: 50,
    padding: 3,
    alignSelf: 'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(SIZE_AVATAR),
    width: wp(SIZE_AVATAR),
    borderRadius: 50,
  },
});
