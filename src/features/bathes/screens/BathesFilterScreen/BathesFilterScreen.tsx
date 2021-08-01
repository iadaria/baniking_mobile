import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { IRootState } from '~/src/app/store/rootReducer';
import {
  getBathFilterParams as getBathFilterParamsAction,
  checkInit as checkInitAction,
  checkFilter as checkFilterAction,
} from '~/src/features/bathes/store/bathActions';
import { BathParams } from '~/src/app/models/bath';
import { Block } from '~/src/app/common/components/UI';
import { Header } from '~/src/app/common/components/Header';
import { Pricer } from './components/Pricer';
import { FilterAcceptButton } from './FilterAcceptButton';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  paramsCheck: BathParams;
  getBathFilterParams: () => void;
  checkInit: () => void;
  checkFilter: () => void;
}

function BathesFilterScreenContainer({
  navigation,
  paramsCheck,
  getBathFilterParams,
  checkInit,
  checkFilter,
}: IProps) {
  // Получаем параметры для фильтрации
  useEffect(() => {
    checkInit();
    getBathFilterParams();
  }, [checkInit, getBathFilterParams]);

  useEffect(() => {
    checkFilter();
  }, [checkFilter, paramsCheck]);

  return (
    <>
      <Block full base>
        <Header iconKind="backward" />
        <Pricer />
      </Block>
      <FilterAcceptButton navigation={navigation} />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsCheck: bath.paramsCheck,
  }),
  {
    getBathFilterParams: getBathFilterParamsAction,
    checkInit: checkInitAction,
    checkFilter: checkFilterAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };

/* const DEFAULT_PARAMS: BathParams = {
    page: 0,
    steam_rooms_ids: [],
    services_ids: [],
    zones_ids: [],
    types: [],
  }; */
