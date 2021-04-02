import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Block } from '~/src/app/common/components/UI';
import { styles } from './styles';

interface ICachedImage {
  uri: string;
}

interface IProps {
  photos: ICachedImage[];
}

export default function BathSlider({ photos }: IProps) {
  console.log('[BathSlider]', photos);
  const keyExtractor = useCallback((item: ICachedImage) => item.uri, []);

  const renderItem = useCallback(({ item }: { item: ICachedImage }) => {
    __DEV__ && console.log('[BathSlider/renderItem]', item);
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
      data={photos}
      horizontal
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={<Block margin={[0, 4]} />}
    />
  );
}
