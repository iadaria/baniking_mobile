import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { Image } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { ICachedImage, IPersistImages } from '~/src/app/models/persist';
import { isCachedImage } from '~/src/app/utils/bathUtility';
import routes from '~/src/navigation/helpers/routes';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { nonTransparentHeader } from '~/src/app/store/system/systemActions';

interface IProps {
  photos: string[] | undefined;
  persistImages: IPersistImages;
  navigation: StackNavigationProp<ParamListBase>;
}

export default function BathSlider({ photos, persistImages, navigation }: IProps) {
  const dispatch = useDispatch();
  const [cachedPhotos, setCachedPhotos] = useState<ICachedImage[]>([]);

  // Получаем из кэша фотки бани
  useEffect(() => {
    const countCached = cachedPhotos.length;
    // Если фоток больше чем закэшированно
    if (photos && photos.length > countCached) {
      const newCachedPhotos: ICachedImage[] = [];
      photos.forEach((photo: string) => {
        const [isCached, indexOf] = isCachedImage(photo, persistImages.set);
        //__DEV__ && console.log('[BathScreen/useEffect/photos] isCached', isCached, photo, indexOf);
        if (isCached) {
          newCachedPhotos.push({ uri: persistImages.images[indexOf].path });
        }
      });
      // Проверяем добавилось ли хоть одно изображение
      if (newCachedPhotos.length > countCached) {
        setCachedPhotos([...newCachedPhotos]);
      }
      /* __DEV__ &&
        console.log(
          '[BathSlider/newCachedBathPhoto] photo-length/cached-length/new-length',
          photos.length,
          countCached,
          newCachedPhotos.length,
        ); */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, /* cachedBathPhotos, */ persistImages]);

  const keyExtractor = useCallback((item: ICachedImage) => item.uri, []);
  const renderItem = useCallback(
    ({ item, index }: { item: ICachedImage; index: number }) => {
      // Переходим на слайдер и скролим до выбранного фото
      function handlerShowPhotos() {
        //dispatch(nonTransparentHeader());
        navigation.navigate(routes.bathesTab.BathesPhotosScreen, {
          photos: [...cachedPhotos],
          currentIndex: index,
        });
      }
      // __DEV__ && console.log('[BathSlider/renderItem]', item);
      return (
        <TouchableOpacity onPress={handlerShowPhotos}>
          <Image style={styles.photoListItem} source={item} resizeMethod="resize" />
        </TouchableOpacity>
      );
    },
    [cachedPhotos, /* dispatch,  */navigation],
  );

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 10, paddingTop: 8 }}
      style={styles.photoList}
      data={cachedPhotos}
      horizontal
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={<Block margin={[0, 4]} />}
    />
  );
}
