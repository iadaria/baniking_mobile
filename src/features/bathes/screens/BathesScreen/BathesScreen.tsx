import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { Bath, BathParams } from '~/src/app/models/bath';
import { Header } from '~/src/app/common/components/Header';
//import { BathesList } from './components/BathList';
import { Sorter } from './components/Sorter';
import { Searcher } from './components/Searcher';
//import { FilterButton } from './components/FilterButton';
import { SelectedCity } from './components/SelectedCity';
import { fetchBathes as fetchBathesAction } from '~/src/features/bathes/store/bathActions';
import { Button } from 'react-native';
import { nextPage as nextPageAction } from '~/src/features/filters/base/store/baseFilterActions';

interface IProps {
  loading: boolean;
  bathes: Bath[];
  params: BathParams;
  canLoadMoreBathes: boolean;
  fetchBathes: () => void;
  nextPage: () => void;
}

export function BathesScreenContainer({
  //loading,
  //bathes,
  params,
  canLoadMoreBathes,
  fetchBathes,
  nextPage,
}: IProps) {
  useEffect(() => {
    fetchBathes();
  }, [fetchBathes, params]);

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

      <SelectedCity />

      <AppText margin={[0, 0, 2, 4]} h1>
        Каталог бань
      </AppText>

      <Block padding={[0, 0, 0, 4]} center row>
        <Searcher />
        {/* <FilterButton /> */}
      </Block>

      <Sorter />

      <Block margin={1} />
      <Button title="Load more" onPress={handleLoadMore} />
      {/* <BathesList bathes={bathes} loadMore={handleLoadMore} loading={loading} /> */}
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath, baseFilter }: IRootState) => ({
    loading: bath.loading,
    bathes: bath.bathes,
    params: baseFilter.params,
    canLoadMoreBathes: bath.canLoadMore,
  }),
  {
    fetchBathes: fetchBathesAction,
    nextPage: nextPageAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
