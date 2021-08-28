import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { Header } from '~/src/app/common/components/Header';
import { AcceptButton } from './components/AcceptButton';
import {
  checkFilter as checkFilterAction,
  fetchTouchParams as fetchTouchParamsAction,
} from '../../store/flterActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBathExtraParams } from '~/src/app/models/filter';
import { AllFilters } from './components/AllFilters';
import { styles as s } from './styles';

interface IProps {
  extraParams?: Partial<IBathExtraParams>;
  fetchTouchParams: () => void;
  checkFilter: () => void;
}

function BathesFilterScreenContainer({
  extraParams,
  fetchTouchParams,
  checkFilter,
}: IProps) {
  const [recreate, setRecreate] = useState(false);

  useEffect(() => {
    fetchTouchParams();
  }, [fetchTouchParams]);

  useEffect(() => {
    checkFilter();
  }, [checkFilter, extraParams]);

  const updateAllFilters = () => setRecreate(!recreate);

  return (
    <>
      <ScrollView style={s.sv}>
        <Header iconKind="backward" />
        <AllFilters key={+recreate} update={updateAllFilters} />
        <Block margin={[10, 0]} />
      </ScrollView>
      <AcceptButton />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ filter }: IRootState) => ({
    extraParams: filter.extraParams,
  }),
  {
    fetchTouchParams: fetchTouchParamsAction,
    checkFilter: checkFilterAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
