import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Block } from '~/src/app/common/components/UI';
//import { ICachedImage } from '~/src/app/models/persist';
//import { isCachedImage } from '~/src/app/utils/bathUtility';
import { routes } from '~/src/navigation/helpers/routes';
import { styles } from './styles';
import * as RNav from '~/src/navigation/helpers/RootNavigation';
//import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';
import { colors } from '~/src/app/common/constants';

interface IProps {
  photos: string[];
}

export default function BathSlider({ photos }: IProps) {
  //const keyExtractor = useCallback((item: ICachedImage) => item.uri, []);
  const keyExtractor = useCallback((_, index: number) => `item-${index}`, []);
  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      // Переходим на слайдер и скролим до выбранного фото
      function handlerShowPhotos() {
        //dispatch(nonTransparentHeader());
        RNav.navigate(routes.bathesTab.BathesPhotos, {
          photos,
          currentIndex: index,
        });
      }
      const indicator = (
        <ActivityIndicator size="small" color={colors.secondary} />
      );
      return (
        <TouchableOpacity onPress={handlerShowPhotos}>
          <Image
            onLoad={() => indicator}
            style={styles.photoListItem}
            source={{ uri: item }}
            resizeMethod="resize"
          />
        </TouchableOpacity>
      );
    },
    [photos],
  );

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 10, paddingTop: 8 }}
      style={styles.photoList}
      data={photos}
      horizontal
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={<Block margin={[0, 4]} />}
    />
  );
}

// Получаем из кэша фотки бани
// useEffect(() => {
//   const countCached = cachedPhotos.length;
//   // Если фоток больше чем закэшированно
//   if (photos && photos.length > countCached) {
//     const newCachedPhotos: ICachedImage[] = [];
//     photos.forEach((photo: string) => {
//       const [isCached, indexOf] = isCachedImage(photo, persistImages.set);
//       // logline('[BathScreen/useEffect/photos] isCached', isCached, photo, indexOf);
//       if (isCached) {
//         newCachedPhotos.push({ uri: persistImages.images[indexOf].path });
//       }
//     });
//     // Проверяем добавилось ли хоть одно изображение
//     if (newCachedPhotos.length > countCached) {
//       setCachedPhotos([...newCachedPhotos]);
//     }
//     /* logline(
//         '[BathSlider/newCachedBathPhoto] photo-length/cached-length/new-length',
//         photos.length,
//         countCached,
//         newCachedPhotos.length,
//       ); */
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [photos, /* cachedBathPhotos, */ persistImages]);
