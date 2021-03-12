import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  getBathes as getBathesAction,
  fetchBathes as fetchBathesAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBath, TPartBathParameter } from '~/src/app/models/bath';
import BathItem from './BathItem';
import { FlatList } from 'react-native-gesture-handler';
import { IBathAction } from '~/src/app/models/bath';
import { canLoadMore, isBegin } from '~/src/app/utils/common';
import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';
import { FilterIcon, ListIcon, SearchIcon } from '~/src/assets';
import { colors, sizes } from '~/src/app/common/constants';
import { styles } from './styles';
import AppListIndicator from './AppListIndicator';

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
}

export function BathesScreenContainer({
  loading,
  totalBathes,
  bathes,
  getBathes,
  fetchBathes,
  moreBathes,
  lastPage,
  retainState,
}: IProps) {
  // const [nextPage, setNextPage] = useState(lastPage);

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
  }, [bathes, fetchBathes, lastPage, moreBathes, totalBathes]);

  // Вызов если только запускаем приложение - не одной записи еще не полученоr
  useEffect(() => {
    if (isBegin(lastPage)) {
      handleLoadMore();
    }
  }, [handleLoadMore, lastPage]);
  /* useEffect(() => {
    if (isBegin(nextPage)) {
      setNextPage((currentPage: number) => currentPage + 1);
    }
  }, [nextPage]); */

  const renderItem = useCallback(({ item }: { item: IBath }) => {
    return <BathItem bath={item} />;
  }, []);

  const keyExtractor = useCallback((bath: IBath) => String(bath.id), []);

  /* if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  } */

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
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        ListFooterComponent={loading ? <AppListIndicator /> : null}
      />

      {/* Card */}
      {/* {bathes?.map((bath: IBath, index: number) => (
        <BathItem key={`item-${index}`} bath={bath} />
      ))} */}
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
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };

/*   useEffect(() => {
    const resolve = Image.reolveAssetSource(testCardImg);
    // const width = Dimensions.get('screen').width - wp(sizes.offset.base) * 2;
    const width = windowWidth - wp(sizes.offset.base) * 2;
    console.log(resolve);
    ImageResizer.createResizedImage(resolve.uri, width, width, 'PNG', 100)
      .then((response: Response) => {
        console.log('[BathesScreen/resize/done] response', response);
        setNewImg(response);
      })
      .catch((error) => console.log('[BathesScreen/resize error]', error));
    /* Image.getSize(testCardImg, (width: number, height: number) => {
      console.log('[BathesScreen/useEffect', width, height);
    });
  }, []);
 */

/* useEffect(
    () => {
      console.log('[BathesScreen/useEffect(nextPage)]');
      if (bathes && bathes.length >= 4) {
        return;
      }
      if (nextPage === lastPage) {
        return;
      }
      // const nextPage = lastPage + 1;
      const bathParams: TPartBathParameter = {
        page: nextPage,
      };
      fetchBathes({ bathParams, moreBathes, lastPage: nextPage });
    },
    [nextPage],
  ); */

/* const image = '../../../../assets/images/png/testCard.jpg';
  const [newImg, setNewImg] = useState<Response>(); */
