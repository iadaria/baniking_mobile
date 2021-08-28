import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { Header } from '~/src/app/common/components/Header';
import { Pricer } from './components/Pricer';
import { Filters } from './components/Filters';
import { Title } from './components/Title';
import { AcceptButton } from './components/AcceptButton';
import {
  checkFilter as checkFilterAction,
  fetchTouchParams as fetchTouchParamsAction,
  initExtraParams as initExtraParamsAction,
  cleanExtraParams as cleanExtraParamsAction,
  rollbackExtraParams as rollbackExtraParamsAction,
} from '../../store/flterActions';
import { clearBathes as clearBathesAction } from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBathExtraParams, TouchParams } from '~/src/app/models/filter';
import { styles as s } from './styles';
import { useState } from 'react';
import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';

interface IProps {
  touchParams: Partial<TouchParams>;
  extraParams?: Partial<IBathExtraParams>;
  isExtra: boolean;
  clearBathes: () => void;
  fetchTouchParams: () => void;
  checkFilter: () => void;
  initExtraParams: () => void;
  rollbackExtraParams: () => void;
  cleanExtraParams: () => void;
}

function BathesFilterScreenContainer({
  // state
  touchParams,
  extraParams,
  isExtra,
  // actions
  clearBathes,
  fetchTouchParams,
  checkFilter,
  initExtraParams,
  rollbackExtraParams,
  cleanExtraParams,
}: IProps) {
  const [initialized, setInitialized] = useState(false);
  const { types, services, zones, steamRooms } = touchParams;

  useEffect(() => {
    initExtraParams();
    setInitialized(true);
    return () => cleanExtraParams();
  }, [initExtraParams, cleanExtraParams]);

  useEffect(() => {
    fetchTouchParams();
  }, [fetchTouchParams]);

  useEffect(() => {
    checkFilter();
  }, [checkFilter, extraParams]);

  function handleClean() {
    if (isExtra) {
      clearBathes();
      rollbackExtraParams();
    } else {
      cleanExtraParams();
    }
  }

  let filters;
  filters = !initialized && <AppActivityIndicator />;
  filters = initialized && (
    <>
      <Title onPress={handleClean} />
      <Pricer />
      <Filters title="Уровни" items={types} field="types" />
      <Filters title="Сервис" items={services} field="services_ids" />
      <Filters title="Аквазоны" items={zones} field="zones_ids" />
      <Filters title="Виды парной" items={steamRooms} field="steam_rooms_ids" />
    </>
  );

  return (
    <>
      <ScrollView style={s.sv}>
        <Header iconKind="backward" />
        {filters}
        <Block margin={[10, 0]} />
      </ScrollView>
      <AcceptButton />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ filter }: IRootState) => ({
    params: filter.params,
    touchParams: filter.touchParams,
    extraParams: filter.extraParams,
    isExtra: filter.isExtra,
  }),
  {
    fetchTouchParams: fetchTouchParamsAction,
    checkFilter: checkFilterAction,
    clearBathes: clearBathesAction,
    initExtraParams: initExtraParamsAction,
    rollbackExtraParams: rollbackExtraParamsAction,
    cleanExtraParams: cleanExtraParamsAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
