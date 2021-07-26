import React, { useCallback, useEffect } from 'react';
import { Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIos } from '~/src/app/common/constants';
import { Bath } from '~/src/app/models/bath';
import { logline } from '~/src/app/utils/debug';
import AppListIndicator from '../AppListIndicator';

interface IProps {
  loading: boolean;
  bathes: Bath[];
  loadMore: () => void;
}

export function BathesList({ loading, bathes, loadMore }: IProps) {
  const keyExtractor = useCallback(({ id }: Bath) => String(id), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};

  useEffect(() => {
    logline('[BathList]', 'mounted');
  }, []);

  const renderItem = useCallback(({ item }: { item: Bath; index: number }) => {
    return (
      <TouchableOpacity onPress={() => { }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  let footerComponent = null;
  if (loading) {
    footerComponent = <AppListIndicator />;
  }

  return (
    <>
      <Button title="Load more" onPress={loadMore} />
      <FlatList
        //for test
        style={[iosStyle, { borderWidth: 1, borderColor: 'red' }]}
        data={bathes}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
        //onEndReached={handleLoadMore}
        //ListEmptyComponent={emptyComponent}
        ListFooterComponent={footerComponent}
      />
    </>
  );
}
