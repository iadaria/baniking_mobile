import React, { useEffect, useState } from 'react';
import { ImageBackground, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import { Response } from 'react-native-image-resizer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, multiplier } from '~/src/app/common/constants';
import {
  //cacheImage,
  getRandomBathImage,
  isNonRating,
} from '~/src/app/utils/bathUtility';
import { KolosIcon } from '~/src/assets';
import { styles } from '../styles';
import { isAndroid } from '~/src/app/utils/system';
import { IPersistImage } from '~/src/app/models/persist';
/* import { getFileName, replaceExtension } from '~/src/app/utils/common';*/
import { Bath } from '~/src/app/models/bath';
import { log } from 'react-native-reanimated';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  bath: Bath;
  distance: number;
  //updateBath: (bath: Bath) => void;
  persistImage?: (image: IPersistImage) => void;
}

export default function BathItem({ bath, distance }: IProps) {
  const {
    name,
    address,
    cachedImage,
    short_description,
    rating,
    image,
    phone,
  } = bath;
  //const [thisCachedImage, setThisCachedImage] = useState(cachedImage);
  const [fadeInOpacity] = useState(new Animated.Value(0));
  const [fadeOutOpacity] = useState(new Animated.Value(0.2));
  const [randomImg] = useState(getRandomBathImage());

  useEffect(() => {
    const multiply = cachedImage ? 8 : 8;
    fadeInOpacity.setValue(0);
    fadeOutOpacity.setValue(0.7);

    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 250 * 1,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeOutOpacity, {
      toValue: 0,
      duration: 250 * multiply,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage]);

  var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
  const androidStyle = isAndroid ? { marginLeft: wp(5) } : {};
  const kms = distance > 0 ? (distance / 1000).toFixed(1) : null;

  return (
    <AnimatedImage
      key={bath.id}
      style={[styles.backgroundImage, androidStyle, { opacity: fadeInOpacity }]}
      imageStyle={styles.imageStyle}
      //source={{ uri: thisCachedImage }}>
      source={{ uri: image }}>
      {/* source={randomImg}> */}
      <LinearGradient
        colors={[colors.primary, 'rgba(23,23,25,0.3)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.5, y: 0 }}
        style={styles.gradient}>
        <AppText
          trajan
          header
          transform="uppercase"
          height={28 * multiplier}
          size={3.8 * multiplier * 1.1}>
          {name}
        </AppText>

        <AppText secondary tag>
          {short_description && `${short_description.substring(0, 45)} ...`}
        </AppText>
        {!isNonRating(rating) ? (
          <Stars rating={rating} />
        ) : (
          <Block style={{ height: wp(5) }} />
        )}
        <AppText lightUltra tag color={colors.bath.address}>
          {address}
          <AppText medium secondary>
            {kms && `   ${kms}  км`}
          </AppText>
        </AppText>
        <AppText style={styles.phone}>{phone}</AppText>
      </LinearGradient>
      <Animated.Image
        style={[styles.temporaryImg, { opacity: fadeOutOpacity }]}
        source={randomImg}
      />

      <KolosIcon style={[styles.kolosIcon]} width={wp(3.5)} height={wp(3.5)} />
    </AnimatedImage>
  );
}
