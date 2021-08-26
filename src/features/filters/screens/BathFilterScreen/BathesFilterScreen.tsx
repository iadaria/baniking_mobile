import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { Header } from '~/src/app/common/components/Header';
import { Pricer } from './components/Pricer';
import { Filters } from './components/Filters';
import { Title } from './components/Title';
import { AcceptButton } from './components/AcceptButton';
import {
  //changeParams as changeParamsAction,
  checkFilter as checkFilterAction,
  cleanExtraParams as cleanExtraParamsAction,
  fetchTouchParams as fetchTouchParamsAction,
  rollbackExtraParams as rollbackExtraParamsAction,
} from '../../store/flterActions';
import { clearBathes as clearBathesAction } from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import {
  BathMainParams,
  IBathBaseParams,
  IBathExtraParams,
  TouchParams,
} from '~/src/app/models/filter';
import { styles as s } from './styles';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  //params: Partial<IBathBaseParams> & { page: number };
  touchParams: Partial<TouchParams>;
  extraParams?: Partial<IBathExtraParams>;
  isExtra: boolean;
  //changeParams: (payload: BathMainParams) => void;
  clearBathes: () => void;
  fetchTouchParams: () => void;
  checkFilter: () => void;
  rollbackExtraParams: () => void;
  cleanExtraParams: () => void;
}

function BathesFilterScreenContainer({
  //params,
  touchParams,
  extraParams,
  isExtra,
  //changeParams,
  clearBathes,
  fetchTouchParams,
  checkFilter,
  rollbackExtraParams,
  cleanExtraParams,
}: IProps) {
  const [recreate, setRecreate] = useState(false);
  const { types, services, zones, steamRooms } = touchParams;

  /*   const mount = useCallback(() => {
      logline('[BathesFilterScreen]', 'mount');
      if (isExtra) {
        changeParams({ prop: 'extraParams', params });
      }
    }, [changeParams, isExtra, params]); */

  const unmount = useCallback(() => {
    logline('[BathesFilterScreen]', 'unmount');
    if (!isExtra) {
      cleanExtraParams();
    }
  }, [cleanExtraParams, isExtra]);

  useEffect(() => {
    //mount();
    return () => unmount();
  }, [unmount]);

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
    }
    if (!isExtra) {
      cleanExtraParams();
    }
    setRecreate(!recreate);
  }

  return (
    <>
      <ScrollView key={+recreate} style={s.sv}>
        {/* <BackButton screen={routes.drawerNavigator.BathesTab} /> */}
        <Header iconKind="backward" />
        <Title onPress={handleClean} />
        <Pricer />
        <Filters title="Уровни" items={types} field="types" />
        {/*<Filters title="Сервис" items={services} field="services_ids" />
        <Filters title="Аквазоны" items={zones} field="zones_ids" />
        <Filters
          title="Виды парной"
          items={steamRooms}
          field="steam_rooms_ids"
  />*/}
        <Block margin={[10, 0]} />
      </ScrollView>
      <AcceptButton />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ filter }: IRootState) => ({
    //params: filter.params,
    touchParams: filter.touchParams,
    extraParams: filter.extraParams,
    isExtra: filter.isExtra,
  }),
  {
    fetchTouchParams: fetchTouchParamsAction,
    checkFilter: checkFilterAction,
    clearBathes: clearBathesAction,
    rollbackExtraParams: rollbackExtraParamsAction,
    cleanExtraParams: cleanExtraParamsAction,
    //changeParams: changeParamsAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
