import React, { useEffect, useState } from 'react';
import { ImageBackground, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Response } from 'react-native-image-resizer';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors } from '~/src/app/common/constants';
import { IBath } from '~/src/app/models/bath';
import { cacheImage, getRandomBathImage } from '~/src/app/utils/bathUtility';
import { KolosIcon, bathThreeImg } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  bath: IBath;
  updateBath: (bath: IBath) => void;
}

export default function BathItem({ bath, updateBath }: IProps) {
  const [multi, setMulti] = useState(8);
  const { name, address, cachedImage, short_description, rating, image } = bath;
  const [thisCachedImage, setThisCachedImage] = useState(cachedImage);
  const [fadeInOpacity, setFadeInOpacity] = useState(new Animated.Value(0));
  const [fadeOutOpacity, setFadeOutOpacity] = useState(new Animated.Value(1));
  //v const [fadeOutOpacity, setFadeOutOpacity] = useState(new Animated.Value(0))
  var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  useEffect(() => {
    // console.log('/n [BathItem/useEffect]');
    if (!thisCachedImage) {
      // console.log('/n [BathItem/useEffect] need cached image');
      cacheImage(image)
        .then((response: Response) => {
          setThisCachedImage(response.uri);
          /* updateBath({
            ...bath,
            cachedImage: response.uri,
          }); */
          // console.log('/n [BathItem/useEffect] cached was update to', response.uri);
        })
        .catch((error) => console.log('[BathItem/useEffect(thisCachedImage)] error', error));
    }
  }, [bath, image, thisCachedImage]);

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

  // const randomBathImage = getRandomBathImage();
  const randomBathImage = bathThreeImg;
  // const imageBackground = '';
  // const imageBackground = thisCachedImage ? { uri: thisCachedImage } : randomBathImage;
  // const opacity = thisCachedImage ? fadeInOpacity : fadeOutOpacity;
  // const imageBackground = { uri: thisCachedImage };

  const temp = '';

  return (
    <AnimatedImage
      key={bath.id}
      style={[styles.backgroundImage, { opacity: fadeInOpacity }]}
      imageStyle={styles.imageStyle}
      source={{ uri: thisCachedImage }}>
      <LinearGradient
        colors={[colors.primary, 'rgba(23,23,25,0.1)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 2, y: 0 }}
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
      <Animated.Image style={[styles.temporaryImg, { opacity: fadeOutOpacity }]} source={randomBathImage} />
    </AnimatedImage>
  );
}

{
  /* <AnimatedImage
style={[styles.backgroundImage, { opacity: opacity }]}
imageStyle={styles.imageStyle}
source={imageBackground}>
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
  <Animated.Image style={styles.temporaryImg} source={randomBathImage} />
</LinearGradient>
</AnimatedImage> */
}
