import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { Header } from '~/src/app/common/components/Header';
import { AcceptButton } from './components/AcceptButton';
import {
  checkFilter as checkFilterAction,
  fetchTouchParams as fetchTouchParamsAction,
  /*   initExtraParams as initExtraParamsAction,
    cleanExtraParams as cleanExtraParamsAction,
    rollbackExtraParams as rollbackExtraParamsAction, */
} from '../../store/flterActions';
//import { clearBathes as clearBathesAction } from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBathExtraParams, TouchParams } from '~/src/app/models/filter';
import { AllFilters } from './components/AllFilters';
import { styles as s } from './styles';

interface IProps {
  //touchParams: Partial<TouchParams>;
  extraParams?: Partial<IBathExtraParams>;
  //isExtra: boolean;
  //clearBathes: () => void;
  fetchTouchParams: () => void;
  checkFilter: () => void;
  //initExtraParams: () => void;
  //rollbackExtraParams: () => void;
  //cleanExtraParams: () => void;
}

function BathesFilterScreenContainer({
  // state
  //touchParams,
  extraParams,
  //isExtra,
  // actions
  //clearBathes,
  fetchTouchParams,
  checkFilter,
}: //initExtraParams,
  //rollbackExtraParams,
  //cleanExtraParams,
  IProps) {
  /*   useEffect(() => {
    initExtraParams();
    setInitialized(true);
    return () => cleanExtraParams();
  }, [initExtraParams, cleanExtraParams]); */

  useEffect(() => {
    fetchTouchParams();
  }, [fetchTouchParams]);

  useEffect(() => {
    checkFilter();
  }, [checkFilter, extraParams]);

  return (
    <>
      <ScrollView style={s.sv}>
        <Header iconKind="backward" />
        <AllFilters />
        <Block margin={[10, 0]} />
      </ScrollView>
      <AcceptButton />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ filter }: IRootState) => ({
    //params: filter.params,
    // touchParams: filter.touchParams,
    extraParams: filter.extraParams,
    //isExtra: filter.isExtra,
  }),
  {
    fetchTouchParams: fetchTouchParamsAction,
    checkFilter: checkFilterAction,
    //clearBathes: clearBathesAction,
    //initExtraParams: initExtraParamsAction,
    //rollbackExtraParams: rollbackExtraParamsAction,
    //cleanExtraParams: cleanExtraParamsAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
