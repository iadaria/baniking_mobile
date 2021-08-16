import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Block } from '~/src/app/common/components/UI';
import { isIos } from '~/src/app/common/constants';
import { Bath } from '~/src/app/models/bath';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { routes } from '~/src/navigation/helpers/routes';
import AppListIndicator from '../AppListIndicator';
import BathItem from '../BathItem';

interface IProps {
  loading: boolean;
  bathes: Bath[];
  loadMore: () => void;
}

export function BathesList({ loading, bathes, loadMore }: IProps) {
  const keyExtractor = useCallback(({ id }: Bath) => String(id), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};

  const handleOpenBath = (bath: Bath, distance: number) => {
    RootNavigation.navigate(routes.bathesTab.BathScreen, {
      id: bath.id,
      latitude: bath.latitude,
      longitude: bath.longitude,
      distance: distance,
    });
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Bath; index: number }) => {
      const distance = 0;
      return (
        //<TouchableOpacity onPress={() => { }}>
        <TouchableOpacity onPress={handleOpenBath.bind(null, item, distance)}>
          <BathItem
            key={`item-${index}`}
            bath={item}
            distance={distance}
          //persistImage={persistImage}
          />
        </TouchableOpacity>
      );
    },
    [],
  );

  let footerComponent = null;
  if (loading) {
    footerComponent = <AppListIndicator />;
  }

  return (
    // Block need delete
    <Block margin={[2, 0, 0, 0]} full>
      {/* <Button title="Load more" onPress={loadMore} /> */}
      <FlatList
        //for test
        style={[
          iosStyle,
          // { marginTop: 10, borderWidth: 1, borderColor: 'red' },
        ]}
        data={bathes}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        //ListEmptyComponent={emptyComponent}
        ListFooterComponent={footerComponent}
      />
    </Block>
  );
}
