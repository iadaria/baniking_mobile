import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppButton, AppText } from '~/src/app/common/components/UI';
import {
  detectGeo as detectGeoAction,
  detectCity as detectCityAction,
} from '~/src/features/map/store/mapActions';
import { checkPermissionLocation as checkPermissionLocationAction } from '~/src/app/store/permission/permissionActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { Permit } from '~/src/app/store/permission/permissionReducer';
import { Location } from '~/src/app/models/map';

interface IProps {
  location: Location | null;
  permissionLocation: [boolean, Permit];
  checkPermissionLocation: () => void;
  detectGeo: () => void;
  detectCity: () => void;
}

function DetectLocationContainer({
  location,
  permissionLocation,
  checkPermissionLocation,
  detectGeo,
  detectCity,
}: IProps) {
  const [needCity, setNeedCity] = useState(false);
  const [granted] = permissionLocation;

  // Если из state получили что нет прав - запрашиваем снова
  useEffect(() => {
    if (!granted) {
      checkPermissionLocation();
    }
  }, [checkPermissionLocation, granted]);

  // Если зи state получили что есть права - запрашиваем geo
  useEffect(() => {
    if (granted) {
      detectGeo();
    }
  }, [detectGeo, granted]);

  //  Если пользователь хочет найти бани рядом
  useEffect(() => {
    if (needCity && location) {
      detectCity();
      setNeedCity(false);
    }
  }, [needCity, location, detectCity]);

  const handleDetectCity = () => setNeedCity(true);

  return (
    <AppButton margin={[2, 0, 0]} onPress={handleDetectCity}>
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
    detectGeo: detectGeoAction,
    detectCity: detectCityAction,
    checkPermissionLocation: checkPermissionLocationAction,
  },
)(DetectLocationContainer);

export { DetectLocationConnected as DetectLocation };
