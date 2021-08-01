import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { IRootState } from '~/src/app/store/rootReducer';
import {
  getBathFilterParams as getBathFilterParamsAction,
  checkInit as checkInitAction,
  checkClean as checkCleanAction,
  checkFilter as checkFilterAction,
} from '~/src/features/bathes/store/bathActions';
import { BathFilterParams, BathParams } from '~/src/app/models/bath';
import { AppText, Block } from '~/src/app/common/components/UI';
import { Header } from '~/src/app/common/components/Header';
import { Pricer } from './components/Pricer';
import { FilterAcceptButton } from './FilterAcceptButton';
import { Filters } from './components/Filters';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles as s } from './styles';
import { CloseFilerIcon } from '~/src/assets';

function Title({ onPress }: { onPress: () => void }) {
  const { filterCount } = useSelector(({ bath }: IRootState) => bath);
  return (
    <Block center row space="between">
      <AppText h1>Выбрано фильтров</AppText>
      <AppText margin={[0, 0, 0, 11]} style={s.button} semibold h2>
        {filterCount}
      </AppText>
      <TouchableOpacity
        style={[s.closeIcon, s.border, { marginBottom: 0 }]}
        onPress={onPress}>
        <CloseFilerIcon />
      </TouchableOpacity>
    </Block>
  );
}

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
  navigation,
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
    getBathFilterParams();
  }, [checkInit, getBathFilterParams]);

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
      <FilterAcceptButton navigation={navigation} />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsCheck: bath.paramsCheck,
    filters: bath.paramsFilter,
  }),
  {
    getBathFilterParams: getBathFilterParamsAction,
    checkInit: checkInitAction,
    checkFilter: checkFilterAction,
    checkClean: checkCleanAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
