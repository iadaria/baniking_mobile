import React, { useCallback, useEffect } from 'react';
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
import { IBath, TPartBathParameter, IBathAction } from '~/src/app/models/bath';
import BathItem from './BathItem';
import AppListIndicator from './AppListIndicator';
import { canLoadMore, isBegin } from '~/src/app/utils/common';
import { FilterIcon, KolosIcon, ListIcon, SearchIcon } from '~/src/assets';
import { multiplier, sizes } from '~/src/app/common/constants';
import { styles } from './styles';
import { isIos } from '../../../../app/common/constants/platform';

interface IProps {
  loading: boolean;
  totalBathes: number;
  bathes: IBath[] | null;
  moreBathes: boolean;
  lastPage: number;
  retainState: boolean;
  // functions
  getBathes: () => void;
  fetchBathes: (payload: IBathAction) => void;
  updateBath: (bath: IBath) => void;
}

export function BathesScreenContainer({
  loading,
  totalBathes,
  bathes,
  // getBathes,
  fetchBathes,
  updateBath,
  // moreBathes,
  lastPage,
}: // retainState,
IProps) {
  const handleLoadMore = useCallback(() => {
    const _moreBathes = canLoadMore(totalBathes, bathes?.length || 0, lastPage);
    if (_moreBathes) {
      const nextPage = lastPage + 1;
      // TODO Test
      const bathParams: TPartBathParameter = {
        page: nextPage,
      };
      fetchBathes({ bathParams, moreBathes: _moreBathes, lastPage: nextPage });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [bathes, fetchBathes, lastPage, totalBathes]);

  useEffect(() => {
    // console.log('[BathesScreen/useEffect] batehs', JSON.stringify(bathes, null, 2));
  }, [bathes]);

  // Вызов если только запускаем приложение - не одной записи еще не полученоr
  useEffect(() => {
    if (isBegin(lastPage)) {
      handleLoadMore();
    }
  }, [handleLoadMore, lastPage]);

  const renderItem = useCallback(
    ({ item, index }: { item: IBath; index: number }) => {
      return (
        <>
          {/* <KolosIcon style={[styles.kolosIcon]} width={wp(4.4) * multiplier} height={wp(4.4) * multiplier} /> */}
          <BathItem key={`item-${index}`} bath={item} updateBath={updateBath} />
        </>
      );
    },
    [updateBath],
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
      <Block margin={[0, 0, 0, 4]} style={styles.sort} center row>
        <AppText>Сортировать</AppText>
        <ListIcon />
      </Block>

      <Block margin={[sizes.offset.between, 0, 0]} />

      <FlatList
        data={bathes}
        style={iosStyle}
        // initialNumToRender={5}
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
    moreBathes: bath.moreBathes,
    lastPage: bath.lastPage,
    retainState: bath.retainState,
  }),
  {
    getBathes: getBathesAction,
    fetchBathes: fetchBathesAction,
    updateBath: updateBathAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
