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
import {
  clearBathes as clearBathesAction,
  setFilter as setFilterAction,
} from '~/src/features/bathes/store/bathActions';
import { IPersistImage } from '~/src/app/models/persist';
import { IModalState, openModal as openModalAction } from '~/src/app/common/modals/modalReducer';
import { FilterIcon, ListIcon, SearchIcon, SearchCancelIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import { styles } from './styles';
import NotFound from './NotFound';

interface IProps {
  loading: boolean;
  totalBathes: number;
  bathes: IBath[] | null;
  moreBathes: boolean;
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
  clearBathes: () => void;
  setFilter: (payload: { params: TPartBathParams }) => void;
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
  params,
  clearBathes,
  setFilter,
}: // lastPage,
// retainState,
IProps) {
  const [yForModal, setYForModal] = useState(wp(4));
  const [searchName, setSearchName] = useState<string | undefined>();
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

  const isEmpty = () => !searchName || (searchName && String(searchName).trim().length === 0);

  const renderItem = useCallback(
    ({ item, index }: { item: IBath; index: number }) => {
      return <BathItem key={`item-${index}`} bath={item} updateBath={updateBath} persistImage={persistImage} />;
    },
    [updateBath, persistImage],
  );

  const keyExtractor = useCallback((item: IBath, index) => String(index), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};

  function handleFilter(newParams: TPartBathParams) {
    clearBathes();
    setFilter({ params: newParams });
  }

  return (
    <Block full padding={[sizes.offset.base, sizes.offset.base, 0, 4]}>
      <AppText margin={[0, 0, 2, 4]} h1>
        Каталог бань
      </AppText>
      <Block padding={[0, 0, 0, 4]} center row>
        <Block style={styles.searchWrapper} center row>
          <TextInput
            style={styles.searchInput}
            placeholder="Что вы ищите?"
            onChangeText={(name: string) => {
              console.log('[BathesScreen]', name);
              const newName = String(name).toLowerCase();
              setSearchName(newName);
              const newParams: TPartBathParams = {
                ...params,
                search_query: searchName,
              };
              if (newName.length > 3) {
                handleFilter(newParams);
              }
            }}
            value={searchName}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={64}
          />
          {isEmpty() ? (
            <TouchableOpacity style={styles.searchIconButton} onPress={() => {}}>
              <SearchIcon style={styles.searchIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.searchIconButton}
              onPress={() => {
                setSearchName(undefined);
                const newParams: TPartBathParams = { ...params };
                delete newParams.search_query;
                handleFilter(newParams);
              }}>
              <SearchCancelIcon style={styles.searchIcon} />
            </TouchableOpacity>
          )}
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

      {totalBathes === 0 ? (
        <NotFound />
      ) : (
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
      )}
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath }: IRootState) => ({
    loading: bath.loading,
    totalBathes: bath.totalBathes,
    bathes: bath.bathes,
    params: bath.params,
    moreBathes: bath.moreBathes,
    retainState: bath.retainState,
  }),
  {
    getBathes: getBathesAction,
    fetchBathes: fetchBathesAction,
    updateBath: updateBathAction,
    persistImage: persistImageAction,
    openModal: openModalAction,
    clearBathes: clearBathesAction,
    setFilter: setFilterAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
