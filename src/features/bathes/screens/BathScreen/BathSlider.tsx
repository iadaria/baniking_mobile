import React, { createRef, useCallback, useEffect, useState } from 'react';
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
  const [cachedBathPhotos, setCachedBathPhotos] = useState<ICachedImage[]>([]);

  // Получаем из кэша фотки бани
  useEffect(() => {
    if (photos && photos.length > 0 && cachedBathPhotos.length !== photos.length) {
      const newCachedBathPhotos: ICachedImage[] = [];
      photos.forEach((photo: string) => {
        const [isCached, indexOf] = isCachedImage(photo, persistImages.set);
        //__DEV__ && console.log('[BathScreen/useEffect/photos] isCached', isCached, photo, indexOf);
        if (isCached) {
          newCachedBathPhotos.push({ uri: persistImages.images[indexOf].path });
        }
      });
      // Проверяем добавилось ли хоть одно изображение
      newCachedBathPhotos.length !== cachedBathPhotos.length && setCachedBathPhotos(newCachedBathPhotos);
      __DEV__ && console.log('[BathSlider/newCachedBathPhoto]', newCachedBathPhotos.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, /* cachedBathPhotos, */ persistImages]);

  const keyExtractor = useCallback((item: ICachedImage) => item.uri, []);
  const renderItem = useCallback(
    ({ item, index }: { item: ICachedImage; index: number }) => {
      // Переходим на слайдер и скролим до выбранного фото
      function handlerShowPhotos() {
        dispatch(nonTransparentHeader());
        navigation.navigate(routes.bathesTab.BathesPhotosScreen, {
          photos: [...cachedBathPhotos],
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
    [cachedBathPhotos, dispatch, navigation],
  );

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 10, paddingTop: 8 }}
      style={styles.photoList}
      data={cachedBathPhotos}
      horizontal
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={<Block margin={[0, 4]} />}
    />
  );
}
