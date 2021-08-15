import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppButton, AppText } from '~/src/app/common/components/UI';
import {
  detectGeo as detectGeoAction,
  detectCity as detectCityAction,
} from '~/src/features/map/store/mapActions';
import { checkPermissionLocation as checkPermissionLocationAction } from '~/src/app/store/permission/permissionActions';
import { Permit } from '~/src/app/store/permission/permissionReducer';
import { IRootState } from '~/src/app/store/rootReducer';
import { Location } from '~/src/app/models/map';
import { fetchCities as fetchCitiesAction } from '../../store/cityActions';

interface IProps {
  permissionLocation: [boolean, Permit];
  location: Location | null;
  checkPermissionLocation: () => void;
  detectGeo: () => void;
  detectCity: () => void;
  fetchCities: () => void;
}

function DetectLocationContainer({
  location,
  permissionLocation,
  checkPermissionLocation,
  detectGeo,
  detectCity,
}: IProps) {
  const [granted] = permissionLocation;

  useEffect(() => {
    checkPermissionLocation();
  }, [checkPermissionLocation]);

  useEffect(() => {
    if (granted) {
      detectGeo();
    }
  }, [detectGeo, granted]);

  //function handleDetectCity() { }

  return (
    <AppButton margin={[2, 0, 0]} onPress={detectCity}>
      <AppText medium center size={4}>
        Определить мое местоположение
      </AppText>
    </AppButton>
  );
}

const DetectLocationConnected = connect(
  ({ permission, map }: IRootState) => ({
    permissionLocation: permission.location,
    location: map.location,
  }),
  {
    fetchCities: fetchCitiesAction,
    detectGeo: detectGeoAction,
    detectCity: detectCityAction,
    checkPermissionLocation: checkPermissionLocationAction,
  },
)(DetectLocationContainer);

export { DetectLocationConnected as DetectLocation };

/*   useEffect(() => {
    if (granted) {
      detectGeo();
    }
  }, [detectGeo, granted, permit]);

  function handleDetectLocation() {
    detectCity();
  } */
