import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
  BathFilterParams,
  bathType,
  BathParams,
} from '~/src/app/models/bath';
import {
  getBathFilterParams as getBathFilterParamsAction,
  checkFilter as checkFilterAction,
} from '~/src/features/bathes/store/bathActions';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { RightButton } from './RightButton';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IRootState } from '~/src/app/store/rootReducer';
import { CloseFilerIcon } from '~/src/assets';
import { useDebouncedCallback } from 'use-debounce/lib';
import FilterRooms from './FilterRooms';
import FilterServices from './FilterServices';
import FilterZones from './FilterZones';
import FilterTypes from './FilterTypes';
import { styles } from './styles';
import { FilterAcceptButton } from './FilterAcceptButton';
import { calculateFilterCount } from '~/src/app/utils/bathUtility';
import {
  initializeFilterParams,
  cleanFilterParams,
} from '../../../../app/utils/bathUtility';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { log, logline } from '~/src/app/utils/debug';
import { BackButton } from '~/src/app/common/components/BackButton';
import { Header } from '~/src/app/common/components/Header';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  paramsFilter: BathFilterParams | null;
  bathParams: BathParams;
  getBathFilterParams: () => void;
  checkFilter: ({ filterParams }: { filterParams: BathParams }) => void;
}

const DEFAULT_PARAMS: BathParams = {
  page: 0,
  steam_rooms_ids: [],
  services_ids: [],
  zones_ids: [],
  types: [],
};

function BathesFilterScreenContainer({
  navigation,
  paramsFilter,
  //filterCount,
  bathParams,
  getBathFilterParams,
  checkFilter,
}: IProps) {

  // Получаем параметры для фильтрации
  useEffect(() => {
    if (!paramsFilter) {
      getBathFilterParams();
    }
  }, [getBathFilterParams, paramsFilter]);

  return (
    <Block full base>
      <Header iconKind="backward" />
    </Block>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsFilter: bath.paramsFilter,
    bathParams: bath.params,
  }),
  {
    getBathFilterParams: getBathFilterParamsAction,
    checkFilter: checkFilterAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
