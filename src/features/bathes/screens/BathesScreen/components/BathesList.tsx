import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FlatList, TouchableOpacity } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { Bath } from '~/src/app/models/bath';
import AppListIndicator from '../AppListIndicator';
import BathItem from './BathItem';
import NotFound from '../NotFound';
import { CleanButton } from './CleanButton';
import {
  cleanParams as cleanParamsAction,
  nextPage as nextPageAction,
} from '~/src/features/filters/store/flterActions';
import {
  clearBathes as clearBathesAction,
  selectBath,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { isIos } from '~/src/app/common/constants';

interface IProps {
  loading: boolean;
  bathes: Bath[];
  canLoadMore: boolean;
  nextPage: () => void;
  clearBathes: () => void;
  cleanParams: () => void;
}

function BathesListContainer({
  loading,
  bathes,
  canLoadMore,
  nextPage,
  clearBathes,
  cleanParams,
}: IProps) {
  const keyExtractor = useCallback(({ id }: Bath) => String(id), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};

  const renderItem = useCallback(
    ({ item, index }: { item: Bath; index: number }) => {
      const distance = 0;
      return (
        // <TouchableOpacity onPress={handleOpenBath.bind(null, item, distance)}>
        <TouchableOpacity onPress={() => selectBath(item.id)}>
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

  function handleLoadMore() {
    if (canLoadMore) {
      nextPage();
    }
  }

  function handleClean() {
    clearBathes();
    cleanParams();
  }

  const indicator = <AppListIndicator />;
  const clean = <CleanButton title="Очистить фильтр" clean={handleClean} />;
  const footerComponent = !canLoadMore ? clean : loading ? indicator : null;
  const emptyComponent = !loading ? (
    <>
      <NotFound />
      {clean}
    </>
  ) : null;

  return (
    // Block need delete
    <Block margin={[2, 0, 0, 0]} full>
      {/* <Button title="Load more" onPress={loadMore} /> */}
      <FlatList
        style={iosStyle}
        data={bathes}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={footerComponent}
      />
    </Block>
  );
}

const BathesListConnected = connect(
  ({ bath }: IRootState) => ({
    loading: bath.loading,
    bathes: bath.bathes,
    canLoadMore: bath.canLoadMore,
  }),
  {
    nextPage: nextPageAction,
    cleanParams: cleanParamsAction,
    clearBathes: clearBathesAction,
  },
)(BathesListContainer);

export { BathesListConnected as BathesList };
