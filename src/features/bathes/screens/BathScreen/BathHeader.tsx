import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, multiplier, sizes } from '~/src/app/common/constants';
import { nonTransparentHeader, transparentHeader } from '~/src/app/store/system/systemActions';
import { getRandomBathImage, isCachedImage, isNonRating } from '~/src/app/utils/bathUtility';
import { AppHeader } from './AppHeader';
import { styles } from './styles';
import { ICachedImage, IPersistImages } from '~/src/app/models/persist';
import routes from '~/src/navigation/helpers/routes';

export interface IHeadBath {
  name: string;
  short_description: string;
  address: string;
  rating: number;
  image: string;
  latitude: number;
  longitude: number;
}

interface IProps {
  distance?: number;
  navigation: StackNavigationProp<ParamListBase>;
  headBath: Partial<IHeadBath>;
  persistImages: IPersistImages;
}

export default function BathHeader({ distance, navigation, headBath, persistImages }: IProps) {
  const dispatch = useDispatch();
  const [randomImg] = useState(getRandomBathImage());
  const [cachedMainImage, setCachedMainImage] = useState<ICachedImage>();
  const kms = distance && distance > 0 ? (distance / 1000).toFixed(1) : null;
  const { name, rating, short_description, address, image, latitude, longitude } = headBath || {};

  // Получаем из кэша главное изображение для заголовка
  useEffect(() => {
    if (image && !cachedMainImage) {
      const [isCached, indexOf] = isCachedImage(image, persistImages.set);
      //__DEV__ && console.log('[BathHeader/useEffect/image]', image, indexOf);
      if (isCached) {
        setCachedMainImage({ uri: persistImages.images[indexOf].path });
      }
    }
  }, [image, cachedMainImage, persistImages]);

  function handleOpenDestinationMap() {
    navigation.navigate(routes.bathesTab.DestinationMap, { latitude, longitude });
  }

  return (
    <ImageBackground source={cachedMainImage || randomImg} style={styles.bathBackground}>
      <LinearGradient
        colors={[colors.primary, 'rgba(23,23,25, 0.2)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}>
        <AppHeader navigation={navigation} onPress={() => dispatch(nonTransparentHeader())} />
        <Block padding={[sizes.offset.base * multiplier, sizes.offset.base, 0]}>
          <AppText h1>Баня</AppText>
          <AppText margin={[6 * multiplier, 0, 0]} transform="uppercase" height={28 * multiplier} trajan h1>
            {name}
          </AppText>
          <AppText margin={[1, 0, 0]} secondary>
            {short_description && `${short_description.substring(0, 45)} ...`}
          </AppText>
          {!isNonRating(rating || 0.0) ? <Stars rating={rating || 0.0} /> : <Block style={{ height: wp(5) }} />}
        </Block>
        <Block margin={[0, 0, 3, 0]} padding={[0, sizes.offset.base]} center row>
          <AppText tag>{address}</AppText>
          <TouchableOpacity style={styles.route} onPress={handleOpenDestinationMap}>
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
