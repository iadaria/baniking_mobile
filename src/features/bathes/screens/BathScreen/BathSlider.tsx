import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Block } from '~/src/app/common/components/UI';
import { IPersistImages } from '~/src/app/models/persist';
import { isCachedImage } from '~/src/app/utils/bathUtility';
import { styles } from './styles';

interface ICachedImage {
  uri: string;
}

interface IProps {
  photos: string[] | undefined;
  persistImages: IPersistImages;
}

export default function BathSlider({ photos, persistImages }: IProps) {
  //__DEV__ && console.log('[BathSlider]', photos);
  const [cachedBathPhotos, setCachedBathPhotos] = useState<ICachedImage[]>([]);

  // Получаем из кэша фотки бани
  useEffect(() => {
    if (photos && !cachedBathPhotos.length) {
      const newCachedBathPhotos: ICachedImage[] = [];
      photos.forEach((photo: string) => {
        const [isCached, indexOf] = isCachedImage(photo, persistImages.set);
        //__DEV__ && console.log('[BathScreen/useEffect/photos] isCached', isCached, photo, indexOf);
        if (isCached) {
          newCachedBathPhotos.push({ uri: persistImages.images[indexOf].path });
        }
      });
      setCachedBathPhotos(newCachedBathPhotos);
    }
  }, [photos, cachedBathPhotos, persistImages]);

  const keyExtractor = useCallback((item: ICachedImage) => item.uri, []);

  const renderItem = useCallback(({ item }: { item: ICachedImage }) => {
    // __DEV__ && console.log('[BathSlider/renderItem]', item);
    return (
      <TouchableOpacity>
        <Image style={styles.photoListItem} source={item} resizeMethod="resize" />
      </TouchableOpacity>
    );
  }, []);

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
