import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageBackground, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Response } from 'react-native-image-resizer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText } from '~/src/app/common/components/UI';
import { colors, multiplier } from '~/src/app/common/constants';
import { IBath } from '~/src/app/models/bath';
import { cacheImage, getDistance, getRandomBathImage } from '~/src/app/utils/bathUtility';
import { KolosIcon } from '~/src/assets';
import { styles } from './styles';
import { isAndroid } from '~/src/app/utils/system';
import { IPersistImage } from '~/src/app/models/persist';
import { getFileName, replaceExtension } from '~/src/app/utils/common';
import { useSelector } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';
import { ILocation } from '~/src/app/models/user';

interface IProps {
  bath: IBath;
  updateBath: (bath: IBath) => void;
  persistImage: (image: IPersistImage) => void;
  userLocation?: ILocation;
}

export default function BathItem({ bath, updateBath, persistImage, userLocation }: IProps) {
  const { name, address, cachedImage, short_description, rating, image } = bath;
  const [thisCachedImage, setThisCachedImage] = useState(cachedImage);
  const [fadeInOpacity] = useState(new Animated.Value(0));
  const [fadeOutOpacity] = useState(new Animated.Value(0.7));
  const [randomImg] = useState(getRandomBathImage());
  const [kms, setKms] = useState<number | null>(10000);
  const uri = useRef<string | undefined>();
  const { images, set } = useSelector(({ persist }: IRootState) => persist.image);

  // Берем только наименование файла и по нему ищем изображение в кэше телефона
  const fileNameExtension = getFileName(image);
  const fileName = replaceExtension(fileNameExtension, '');
  const indexOf = set.indexOf(fileName);

  useEffect(() => {
    // Если нет кэшированного изображения
    if (!thisCachedImage) {
      // Если изображение по имени найдено в кэше телефона
      if (indexOf !== -1) {
        //console.log('/n [BathItem/useEffect] GOT from persist', bath.id);
        const _cachedImage = images[indexOf];
        setThisCachedImage(_cachedImage.path);
        uri.current = _cachedImage.path;
        return;
      } else {
        // Если изображение по имени не найдено в кэше телеофна
        // То создаем изображение с номальным для телеофна размером и сохраняем в кэше
        //console.log('/n [BathItem/useEffect] NEED cached image', bath.id);
        cacheImage(image)
          .then((response: Response) => {
            setThisCachedImage(response.uri);
            uri.current = response.uri;
          })
          .catch((error) => console.log('[BathItem/useEffect(thisCachedImage)] error', error));
      }
    } else {
      //console.log('/n [BathItem/useEffect] NOT need cached image', bath.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisCachedImage]);

  // Сохраняем в кэше изображение, когда компонент выходит и поля видимости
  const returnUpdate = useCallback(() => {
    /* if (uri.current && !cachedImage) {
      //console.log(`/n [BathItem/useEffect/render] Bath updating id=${bath.id} uri=${uri.current}`);
      updateBath({
        ...bath,
        cachedImage: uri.current,
      });
    } */
    if (uri.current && indexOf === -1) {
      persistImage({ id: fileName, path: uri.current });
      //console.log('/n [BathItem/useEffect] PERSIST image when return', bath.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri.current, cacheImage]);

  // Если у нас есть данные о геолокации пользователя - находим расстояние до бани
  // useEffect(() => {
  //   if (userLocation) {
  //     const { userLatitude, userLongitude } = userLocation;
  //     getDistance({
  //       origins: `${userLatitude},${userLongitude}`,
  //       destinations: `${bath.latitude},${bath.longitude}`,
  //     })
  //       .then((result: number | null) => {
  //         setKms(result);
  //       })
  //       .catch((error) => console.log('[BathItem/useEffect/get kms]', error));
  //     /* getDirections({
  //       origin: `${userLatitude},${userLongitude}`,
  //       destination: `${bath.latitude},${bath.longitude}`,
  //     })
  //       .then((result: [number, string]) => {
  //         const [_kms] = result;
  //         setKms(_kms);
  //       })
  //       .catch((error) => console.log('[BathItem/useEffect/get kms]', error)); */
  //   }
  // }, [bath.latitude, bath.longitude, userLocation]);

  // Обновляем записи только после закрытия страницы, чтобы не менять порядок и не тормозить список
  useEffect(() => {
    return returnUpdate;
  }, [returnUpdate]);

  useEffect(() => {
    const multiply = cachedImage ? 8 : 8;
    fadeInOpacity.setValue(0);
    fadeOutOpacity.setValue(0.7);

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

  var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
  const androidStyle = isAndroid ? { marginLeft: wp(5) } : {};

  return (
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
        <AppText trajan header transform="uppercase" height={28 * multiplier} size={3.8 * multiplier * 1.1}>
          {name}
        </AppText>

        <AppText secondary tag>
          {short_description && `${short_description.substring(0, 45)} ...`}
        </AppText>
        <Stars rating={rating} />
        <AppText lightUltra tag color={colors.bath.address}>
          {address}
          <AppText medium secondary>
            {`   ${(kms / 1000).toFixed(1)} км`}
          </AppText>
        </AppText>
        <AppText style={styles.phone}>0 000 000 00 00</AppText>
      </LinearGradient>
      <Animated.Image style={[styles.temporaryImg, { opacity: fadeOutOpacity }]} source={randomImg} />

      <KolosIcon style={[styles.kolosIcon]} width={wp(3.5)} height={wp(3.5)} />
    </AnimatedImage>
  );
}
