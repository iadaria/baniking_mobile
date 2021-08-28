import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { Bath, BathParams } from '~/src/app/models/bath';
import { Header } from '~/src/app/common/components/Header';
import { Sorter } from './components/Sorter';
import { Searcher } from './components/Searcher';
import { SelectedCity } from './components/SelectedCity';
import { fetchBathes as fetchBathesAction } from '~/src/features/bathes/store/bathActions';
import { FilterButton } from './components/FilterButton';
import { BathesList } from './components/BathesList';

interface IProps {
  loading: boolean;
  bathes: Bath[];
  params: BathParams;
  fetchBathes: () => void;
}

export function BathesScreenContainer({ params, fetchBathes }: IProps) {
  useEffect(() => {
    fetchBathes();
  }, [fetchBathes, params]);

  return (
    <Block safe full padding={[0, 8, 0, 4]}>
      <Block margin={[4, 0, 0, 4]}>
        <Header />
      </Block>

      <SelectedCity />

      <AppText margin={[0, 0, 2, 4]} h1>
        Каталог бань
      </AppText>

      <Block padding={[0, 0, 0, 4]} center row>
        <Searcher />
        <FilterButton />
      </Block>

      <Sorter />
      <BathesList />
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath, filter }: IRootState) => ({
    loading: bath.loading,
    bathes: bath.bathes,
    params: filter.params,
  }),
  {
    fetchBathes: fetchBathesAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
