import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
/* import { Block } from '~/src/app/common/components/UI';
import { Header } from '~/src/app/common/components/Header';
import { Pricer } from './components/Pricer';
import { Filters } from './components/Filters'; */
//import { Title } from './components/Title';
//import { AcceptButton } from './components/AcceptButton';
import { fetchTouchParams as fetchTouchParamsAction } from '../../store/flterActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { TouchParams } from '~/src/app/models/filter';
import { styles as s } from './styles';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  touchParams: Partial<TouchParams>;
  fetchTouchParams: () => void;
}

function BathesFilterScreenContainer({
  touchParams,
  fetchTouchParams,
}: IProps) {
  const { types, services, zones, steamRooms } = touchParams;

  const onMount = useCallback(() => {
    fetchTouchParams();
  }, [fetchTouchParams]);

  useEffect(() => {
    onMount();
  }, [onMount]);

  return (
    <>
      <ScrollView style={s.sv}>
        {/*  <Header iconKind="backward" />
        <Title onPress={handleCheckClean} />
        <Pricer />
        <Filters title="Уровни" items={types} field="types" />
        <Filters title="Сервис" items={services} field="services_ids" />
        <Filters title="Аквазоны" items={zones} field="zones_ids" />
        <Filters
          title="Виды парной"
          items={steamRooms}
          field="steam_rooms_ids"
        />
        <Block margin={[10, 0]} /> */}
      </ScrollView>
      {/* <AcceptButton /> */}
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ filter }: IRootState) => ({
    touchParams: filter.touchParams,
  }),
  {
    fetchTouchParams: fetchTouchParamsAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
