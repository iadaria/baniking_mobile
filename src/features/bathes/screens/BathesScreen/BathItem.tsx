import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageBackground, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Response } from 'react-native-image-resizer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, sizes, multiplier } from '~/src/app/common/constants';
import { IBath } from '~/src/app/models/bath';
import { cacheImage, getRandomBathImage } from '~/src/app/utils/bathUtility';
import { KolosIcon } from '~/src/assets';
import { styles } from './styles';
import { multiHeightLine, isIos } from '../../../../app/common/constants/platform';
import { isAndroid } from '../../../../app/utils/system';

interface IProps {
  bath: IBath;
  updateBath: (bath: IBath) => void;
}

export default function BathItem({ bath, updateBath }: IProps) {
  const { name, address, cachedImage, short_description, rating, image } = bath;
  const [thisCachedImage, setThisCachedImage] = useState(cachedImage);
  const [fadeInOpacity] = useState(new Animated.Value(0));
  const [fadeOutOpacity] = useState(new Animated.Value(0.75));
  const [randomImg] = useState(getRandomBathImage());
  const [x, setX] = useState(0);
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
    fadeOutOpacity.setValue(0.75);

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

  const androidStyle = isAndroid ? { marginLeft: wp(5) } : {};

  return (
    <>
      {/* <KolosIcon style={[styles.kolosIcon]} width={wp(4.4) * multiplier} height={wp(4.4) * multiplier} /> */}
      <AnimatedImage
        key={bath.id}
        style={[styles.backgroundImage, androidStyle, { opacity: fadeInOpacity }]}
        imageStyle={styles.imageStyle}
        source={{ uri: thisCachedImage }}>
        <LinearGradient
          colors={[colors.primary, 'rgba(23,23,25,0.1)']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1.5, y: 0 }}
          style={styles.gradient}>
          <AppText trajan header transform="uppercase" height={28 * multiplier} size={3.8 * multiplier}>
            {name}
          </AppText>

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
        {!cachedImage && (
          <Animated.Image style={[styles.temporaryImg, { opacity: fadeOutOpacity }]} source={randomImg} />
        )}
        <KolosIcon style={[styles.kolosIcon]} width={wp(3.5)} height={wp(3.5)} />
      </AnimatedImage>
    </>
  );
}
