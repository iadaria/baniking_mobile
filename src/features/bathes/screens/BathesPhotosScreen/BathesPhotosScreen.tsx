import React, { useState } from 'react';
import { ParamListBase, Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ICachedImage } from '~/src/app/models/persist';
import { styles } from './styles';
import { Block } from '~/src/app/common/components/UI';
import { FlatList } from 'react-native-gesture-handler';
import { colors, isIos } from '~/src/app/common/constants';
import { bathOneImg } from '~/src/assets';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export function BathesPhotosScreen({ route, navigation }: IProps) {
  const photos = (route?.params || []) as ICachedImage[];

  __DEV__ && console.log('[BathesPhotosScreen]', photos);

  if (!photos.length) return null;

  return (
    <Block full>
      <FlatList
        data={photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: ICachedImage) => item.uri}
        pagingEnabled
        bounces={false}
        renderItem={({ item }: { item: ICachedImage }) => {
          return (
            <Block style={styles.image} center middle debug>
              <Image source={bathOneImg} style={styles.blurImage} />
              <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={isIos ? 1 : 3}
                reducedTransparencyFallbackColor={colors.title}
              />
              <Image style={styles.photo} source={item} resizeMode="center" />
              {/* <Block style={styles.bg} /> */}
            </Block>
          );
        }}
      />
    </Block>
  );
}
