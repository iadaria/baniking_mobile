import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import {
  getBathFilterParams as getBathFilterParamsAction,
  checkInit as checkInitAction,
  checkClean as checkCleanAction,
  checkFilter as checkFilterAction,
} from '~/src/features/filters/store/filterActions';
import { BathFilterParams, BathParams } from '~/src/app/models/bath';
import { Header } from '~/src/app/common/components/Header';
import { Pricer } from './components/Pricer';
import { Filters } from './components/Filters';
import { Title } from './components/Title';
import { AcceptButton } from './components/AcceptButton';
import { styles as s } from './styles';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  paramsCheck: BathParams;
  filters: BathFilterParams;
  getBathFilterParams: () => void;
  checkInit: () => void;
  checkClean: () => void;
  checkFilter: () => void;
}

function BathesFilterScreenContainer({
  paramsCheck,
  filters,
  getBathFilterParams,
  checkInit,
  checkClean,
  checkFilter,
}: IProps) {
  const [create, setCreate] = useState(false);

  const { types, services, zones, steamRooms } = filters;

  // Получаем параметры для фильтрации
  useEffect(() => {
    checkInit();
  }, [checkInit]);

  useEffect(() => {
    getBathFilterParams();
  }, [getBathFilterParams]);

  useEffect(() => {
    checkFilter();
  }, [checkFilter, paramsCheck]);

  function handleCheckClean() {
    checkClean();
    setCreate(!create);
  }

  return (
    <>
      <ScrollView key={+create} style={s.sv}>
        <Header iconKind="backward" />
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
        <Block margin={[10, 0]} />
      </ScrollView>
      <AcceptButton />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ filter }: IRootState) => ({
    paramsCheck: filter.paramsCheck,
    filters: filter.paramsFilter,
  }),
  {
    getBathFilterParams: getBathFilterParamsAction,
    checkInit: checkInitAction,
    checkFilter: checkFilterAction,
    checkClean: checkCleanAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
