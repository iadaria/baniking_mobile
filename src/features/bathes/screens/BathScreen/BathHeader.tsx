import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, multiplier, sizes } from '~/src/app/common/constants';
import {
  getRandomBathImage,
  //isCachedImage,
  isNonRating,
} from '~/src/app/utils/bathUtility';
import { styles } from './styles';
//import { ICachedImage } from '~/src/app/models/persist';
import { Header } from '~/src/app/common/components/Header';
import { MAX_DISTANCE } from '~/src/app/common/constants/common';
import { routes } from '~/src/navigation/helpers/routes';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { IBathDetailed } from '~/src/app/models/bath';

interface IProps {
  bath: IBathDetailed;
  distance?: number;
}

export function BathHeader({ bath, distance }: IProps) {
  const [randomImg] = useState(getRandomBathImage());
  //const [cachedMainImage, setCachedMainImage] = useState<ICachedImage>();
  const kms = distance && distance > 0 ? (distance / 1000).toFixed(1) : null;

  function handleOpenDestinationMap() {
    RootNavigation.navigate(routes.bathesTab.DestinationMap, {
      latitude: bath?.latitude,
      longitude: bath?.longitude,
    });
  }

  return (
    <ImageBackground
      source={{ uri: bath.image } || randomImg}
      style={styles.bathBackground}>
      <LinearGradient
        colors={[colors.primary, 'rgba(23,23,25, 0.2)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}>
        {/* <AppHeader navigation={navigation} onPress={() => { } /* dispatch(nonTransparentHeader()) */}
        <Block padding={[sizes.offset.base * multiplier, sizes.offset.base, 0]}>
          <Header iconKind="backward" />
          <AppText h1>Баня</AppText>
          <AppText
            margin={[6 * multiplier, 0, 0]}
            transform="uppercase"
            height={28 * multiplier}
            trajan
            h1>
            {bath.name}
          </AppText>
          <AppText margin={[1, 0, 0]} secondary>
            {bath.short_description &&
              `${bath.short_description.substring(0, 45)} ...`}
          </AppText>
          {!isNonRating(bath.rating || 0.0) ? (
            <Stars rating={bath.rating || 0.0} />
          ) : (
            <Block style={{ height: wp(5) }} />
          )}
        </Block>
        <Block
          margin={[0, 0, 3, 0]}
          padding={[0, sizes.offset.base]}
          center
          row>
          <AppText tag>{bath.address}</AppText>
          <TouchableOpacity
            style={styles.route}
            activeOpacity={distance && distance < MAX_DISTANCE ? undefined : 1}
            onPress={() => {
              distance && distance < MAX_DISTANCE && handleOpenDestinationMap();
            }}>
            <AppText medium secondary>
              {kms && `${kms} км `}
            </AppText>
            <AppText primary tag>
              маршрут
            </AppText>
          </TouchableOpacity>
        </Block>
      </LinearGradient>
    </ImageBackground>
  );
}
