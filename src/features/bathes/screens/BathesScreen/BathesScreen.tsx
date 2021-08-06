import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  fetchBathes as fetchBathesAction,
  nextPage as nextPageAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { Bath, BathParams } from '~/src/app/models/bath';
import { Header } from '~/src/app/common/components/Header';
import { BathesList } from './components/BathList';
import { Sorter } from './components/Sorter';
import { Searcher } from './components/Searcher';
import { FilterButton } from './components/FilterButton';
import { City } from './components/City';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  loading: boolean;
  bathes: Bath[];
  params: BathParams;
  canLoadMoreBathes: boolean;
  fetchBathes: () => void;
  fetchCities: () => void;
  nextPage: () => void;
}

export function BathesScreenContainer({
  navigation,
  loading,
  bathes,
  params,
  canLoadMoreBathes,
  fetchBathes,
  nextPage,
}: IProps) {

  useEffect(() => {
    fetchBathes();
  }, [fetchBathes, params]);

  useEffect(
    () =>
      navigation.addListener('focus', () =>
        logline('[BathesScreen]', '\nfocused\n'),
      ),
    [navigation],
  );

  // change params
  function handleLoadMore() {
    if (canLoadMoreBathes) {
      nextPage();
    }
  }

  return (
    <Block full padding={[0, 8, 0, 4]}>
      <Block margin={[4, 0, 0, 4]}>
        <Header />
      </Block>

      <City />

      <AppText margin={[0, 0, 2, 4]} h1>
        Каталог бань
      </AppText>

      <Block padding={[0, 0, 0, 4]} center row>
        <Searcher />
        <FilterButton />
      </Block>

      <Sorter />

      <BathesList bathes={bathes} loadMore={handleLoadMore} loading={loading} />
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath }: IRootState) => ({
    loading: bath.loading,
    bathes: bath.bathes,
    params: bath.params,
    canLoadMoreBathes: bath.canLoadMoreBathes,
  }),
  {
    fetchBathes: fetchBathesAction,
    nextPage: nextPageAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
