import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageBackground, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Response } from 'react-native-image-resizer';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors } from '~/src/app/common/constants';
import { IBath } from '~/src/app/models/bath';
import { cacheImage, getRandomBathImage } from '~/src/app/utils/bathUtility';
import { KolosIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  bath: IBath;
  updateBath: (bath: IBath) => void;
}

export default function BathItem({ bath, updateBath }: IProps) {
  const { name, address, cachedImage, short_description, rating, image } = bath;
  const [thisCachedImage, setThisCachedImage] = useState(cachedImage);
  const [fadeInOpacity] = useState(new Animated.Value(0));
  const [fadeOutOpacity] = useState(new Animated.Value(0.8));
  const [randomImg] = useState(getRandomBathImage());
  const uri = useRef<string | undefined>();
  var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  useEffect(() => {
    // console.log('/n [BathItem/useEffect]');
    if (!thisCachedImage) {
      console.log('/n [BathItem/useEffect] need cached image');
      cacheImage(image)
        .then((response: Response) => {
          setThisCachedImage(response.uri);
          uri.current = response.uri;
          // console.log('/n [BathItem/useEffect] cached was update to', response.uri);
        })
        .catch((error) => console.log('[BathItem/useEffect(thisCachedImage)] error', error));
    } else {
      console.log('/n [BathItem/useEffect] Not need cached image');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisCachedImage]);

  const returnUpdate = useCallback(() => {
    if (uri.current && !cachedImage) {
      console.log(`/n [BathItem/useEffect/render] Bath updating id=${bath.id} uri=${uri.current}`);
      updateBath({
        ...bath,
        cachedImage: uri.current,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri.current, cacheImage]);

  // Обновляем записи только после закрытия страницы, чтобы не менять порядок и не тормозить список
  useEffect(() => {
    return returnUpdate;
  }, [returnUpdate]);

  useEffect(() => {
    const multiply = cachedImage ? 0.1 : 8;
    fadeInOpacity.setValue(0);
    fadeOutOpacity.setValue(0.8);

    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 500 * 1,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeOutOpacity, {
      toValue: 0,
      duration: 500 * multiply,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage]);

  // const randomBathImage = bathThreeImg;
  // const imageBackground = '';
  // const imageBackground = thisCachedImage ? { uri: thisCachedImage } : randomBathImage;
  // const opacity = thisCachedImage ? fadeInOpacity : fadeOutOpacity;
  // const imageBackground = { uri: thisCachedImage };
  //const temp = '';

  return (
    <AnimatedImage
      key={bath.id}
      style={[styles.backgroundImage, { opacity: fadeInOpacity }]}
      imageStyle={styles.imageStyle}
      source={{ uri: thisCachedImage }}>
      <KolosIcon style={styles.kolosIcon} />
      <LinearGradient
        colors={[colors.primary, 'rgba(23,23,25,0.1)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 2, y: 0 }}
        style={styles.gradient}>
        <Block style={{ position: 'relative' }}>

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
      <Animated.Image style={[styles.temporaryImg, { opacity: fadeOutOpacity }]} source={randomImg} />
    </AnimatedImage>
  );
}
