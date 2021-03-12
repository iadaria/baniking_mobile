import React from 'react';
import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors } from '~/src/app/common/constants';
import { IBath } from '~/src/app/models/bath';
import { getRandomBathImage } from '~/src/app/utils/bathUtility';
import { KolosIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  bath: IBath;
}

export default function BathItem({ bath }: IBath) {
  const { name, address, cachedImage, short_description, rating } = bath;
  const randomBathImage = getRandomBathImage();

  return (
    <ImageBackground
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
      source={cachedImage || randomBathImage}>
      <LinearGradient
        colors={[colors.primary, 'rgba(23,23,25,0.1)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}>
        <Block>
          <KolosIcon style={styles.kolosIcon} />
          <AppText trajan header transform="uppercase" height={27} size={3.8}>
            {name}
          </AppText>
        </Block>
        <AppText secondary tag>
          {short_description && `${short_description.substring(0, 45)} ...`}
        </AppText>
        <Stars rating={rating} />
        <AppText lightUltra tag color={colors.bath.address}>
          {address}
          <AppText medium secondary>
            {'   3 км'}
          </AppText>
        </AppText>
        <AppText style={styles.phone}>0 000 000 00 00</AppText>
      </LinearGradient>
    </ImageBackground>
  );
}
