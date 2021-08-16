import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Block } from '~/src/app/common/components/UI';
import { isIos } from '~/src/app/common/constants';
import { Bath, BathTouchParams, BathParams } from '~/src/app/models/bath';
import { IRootState } from '~/src/app/store/rootReducer';
import { setBathTouchParams, setParams } from '~/src/features/filters/store/filterActions';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { routes } from '~/src/navigation/helpers/routes';
import AppListIndicator from '../AppListIndicator';
import BathItem from '../BathItem';
import NotFound from '../NotFound';
import UpdateRequestButton from '../UpdateRequestButton';

interface IProps {
  loading: boolean;
  bathes: Bath[];
  loadMore: () => void;
}

export function BathesList({ loading, bathes, loadMore }: IProps) {
  const keyExtractor = useCallback(({ id }: Bath) => String(id), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};
  const { selectedCity } = useSelector((store: IRootState) => store.city);
  const dispatch = useDispatch();

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

  function clearParams() {
    const params: BathParams = {
      page: 1,
      city_id: selectedCity?.id,
    };
    dispatch(setParams(params));
    /* const filterParams: BathTouchParams = {
      types: [],
      zones: [],
      services: [],
      steamRooms: [],
    };
    dispatch(setBathTouchParams(filterParams)); */
  }

  let emptyComponent = null;
  if (!loading) {
    emptyComponent = (
      <>
        <NotFound />
        <UpdateRequestButton
          title="Очистить фильтр"
          handleLoadMore={clearParams}
        />
      </>
    );
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
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={footerComponent}
      />
    </Block>
  );
}
