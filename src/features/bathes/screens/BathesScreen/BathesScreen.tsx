import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextInput, TouchableOpacity, FlatList } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  getBathes as getBathesAction,
  fetchBathes as fetchBathesAction,
  updateBath as updateBathAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBath, IBathAction, TPartBathParams } from '~/src/app/models/bath';
import BathItem from './BathItem';
import AppListIndicator from './AppListIndicator';
import { canLoadMore, isBegin } from '~/src/app/utils/common';
import { isIos } from '~/src/app/common/constants/platform';
import { persistImage as persistImageAction } from '~/src/features/persist/store/appPersistActions';
import { IPersistImage } from '~/src/app/models/persist';
import { IModalState, openModal as openModalAction } from '~/src/app/common/modals/modalReducer';
import { FilterIcon, ListIcon, SearchIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import { styles } from './styles';

interface IProps {
  loading: boolean;
  totalBathes: number;
  bathes: IBath[] | null;
  moreBathes: boolean;
  filter: TPartBathParams;
  params: TPartBathParams;
  // lastPage: number;
  retainState: boolean;
  imageIds: string[];
  cachedImages: IPersistImage[];

  getBathes: () => void;
  fetchBathes: (payload: IBathAction) => void;
  updateBath: (bath: IBath) => void;
  persistImage: (image: IPersistImage) => void;
  openModal: (payload: IModalState) => void;
}

export function BathesScreenContainer({
  loading,
  totalBathes,
  bathes,
  // getBathes,
  fetchBathes,
  updateBath,
  persistImage,
  openModal,
  // moreBathes,
  filter,
  params,
}: // lastPage,
// retainState,
IProps) {
  const [yForModal, setYForModal] = useState(wp(4));
  const { page: lastPage = 0 } = params;

  // TODO Test
  const handleLoadMore = useCallback(() => {
    const countBathes = bathes?.length || 0;
    const canMoreBathes = canLoadMore(totalBathes, countBathes, lastPage);
    if (canMoreBathes) {
      const nextPage = lastPage + 1;
      const bathParams: TPartBathParams = {
        ...params,
        page: nextPage,
      };
      fetchBathes({ bathParams, moreBathes: canMoreBathes, lastPage: nextPage });
    }
  }, [bathes, fetchBathes, lastPage, totalBathes, params]);

  // Вызов если только запускаем приложение - не одной записи еще не полученоr
  useEffect(() => {
    if (isBegin(lastPage)) {
      handleLoadMore();
    }
  }, [handleLoadMore, lastPage, params]);

  const renderItem = useCallback(
    ({ item, index }: { item: IBath; index: number }) => {
      return <BathItem key={`item-${index}`} bath={item} updateBath={updateBath} persistImage={persistImage} />;
    },
    [updateBath, persistImage],
  );

  const keyExtractor = useCallback((item: IBath, index) => String(index), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};

  return (
    <Block full padding={[sizes.offset.base, sizes.offset.base, 0, 4]}>
      <AppText margin={[0, 0, 2, 4]} h1>
        Каталог бань
      </AppText>
      <Block padding={[0, 0, 0, 4]} center row>
        <Block style={styles.searchWrapper} center row>
          <TextInput style={styles.searchInput} placeholder="Что вы ищите?" />
          <TouchableOpacity style={styles.searchIconButton} onPress={() => console.log('search')}>
            <SearchIcon style={styles.searchIcon} />
          </TouchableOpacity>
        </Block>
        <TouchableOpacity style={styles.filter} onPress={() => console.log('filter open')}>
          <FilterIcon />
        </TouchableOpacity>
      </Block>
      {/* Sort */}
      <TouchableOpacity
        onLayout={(event) => setYForModal(event.nativeEvent.layout.y)}
        style={styles.sort}
        onPress={() => openModal({ modalType: 'SortModal', modalProps: { y: yForModal } })}>
        <AppText>Сортировать</AppText>
        <ListIcon />
      </TouchableOpacity>

      <Block margin={[sizes.offset.between, 0, 0]} />

      <FlatList
        data={bathes}
        style={iosStyle}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        ListFooterComponent={loading ? <AppListIndicator /> : null}
      />
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath }: IRootState) => ({
    loading: bath.loading,
    totalBathes: bath.totalBathes,
    bathes: bath.bathes,
    filter: bath.filter,
    params: bath.params,
    moreBathes: bath.moreBathes,
    // lastPage: bath.lastPage,
    retainState: bath.retainState,
  }),
  {
    getBathes: getBathesAction,
    fetchBathes: fetchBathesAction,
    updateBath: updateBathAction,
    persistImage: persistImageAction,
    openModal: openModalAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
