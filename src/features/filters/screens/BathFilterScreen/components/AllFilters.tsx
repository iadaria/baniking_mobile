import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';
import { Filters } from './Filters';
import { Pricer } from './Pricer';
import { Title } from './Title';
import {
  initExtraParams as initExtraParamsAction,
  cleanExtraParams as cleanExtraParamsAction,
  rollbackExtraParams as rollbackExtraParamsAction,
} from '~/src/features/filters/store/flterActions';
import { clearBathes as clearBathesAction } from '~/src/features/bathes/store/bathActions';
import { TouchParams } from '~/src/app/models/filter';
import { IRootState } from '~/src/app/store/rootReducer';

interface IProps {
  update: () => void;
  touchParams: Partial<TouchParams>;
  isExtra: boolean;
  clearBathes: () => void;
  initExtraParams: () => void;
  rollbackExtraParams: () => void;
  cleanExtraParams: () => void;
}

function AllFiltersContainer({
  update,
  // state
  touchParams,
  isExtra,
  // actions
  clearBathes,
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

  function handleClean() {
    if (isExtra) {
      clearBathes();
      rollbackExtraParams();
      //update();
    } else {
      cleanExtraParams();
      //update();
    }
    update();
  }

  if (!initialized) {
    return <AppActivityIndicator />;
  }

  return (
    <>
      <Title onPress={handleClean} />
      <Pricer />
      <Filters title="Уровни" items={types} field="types" />
      <Filters title="Сервис" items={services} field="services_ids" />
      <Filters title="Аквазоны" items={zones} field="zones_ids" />
      <Filters title="Виды парной" items={steamRooms} field="steam_rooms_ids" />
    </>
  );
}

const AllFiltersConnected = connect(
  ({ filter }: IRootState) => ({
    touchParams: filter.touchParams,
    isExtra: filter.isExtra,
  }),
  {
    clearBathes: clearBathesAction,
    initExtraParams: initExtraParamsAction,
    rollbackExtraParams: rollbackExtraParamsAction,
    cleanExtraParams: cleanExtraParamsAction,
  },
)(AllFiltersContainer);

export { AllFiltersConnected as AllFilters };
