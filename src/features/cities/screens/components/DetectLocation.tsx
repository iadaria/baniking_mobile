import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//import Geolocation from 'react-native-geolocation-service';
import { RESULTS } from 'react-native-permissions';
import {
  AppPermission,
  PERMISSION_TYPE,
} from '~/src/app/common/components/AppPersmission';
import { AppButton, AppText } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { setPermissionLocation as setPermissionLocationAction } from '~/src/app/store/permission/permissionActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { Permit } from '~/src/app/store/permission/permissionReducer';
import { detectGeo as detectGeoAction } from '~/src/features/map/store/mapActions';
import { logline } from '~/src/app/utils/debug';

const PERMISSION = PERMISSION_TYPE.location;

interface IProps {
  permissionLocation: [boolean, Permit];
  setPermissionLocation: (payload: [boolean, Permit]) => void;
  detectGeo: () => void;
}

function DetectLocationContainer({
  permissionLocation,
  setPermissionLocation,
  detectGeo,
}: IProps) {
  const [granted, permit] = permissionLocation;

  useEffect(() => {
    if (!granted && permit === RESULTS.BLOCKED) {
      showAlert(
        'Местоположение',
        'Вы заблокировали возможность определения местоположения',
      );
    }
    if (!granted) {
      AppPermission.checkPermission(PERMISSION).then(setPermissionLocation);
    }
  }, [granted, permit, setPermissionLocation]);

  /** Функция ЕДИНОРАЗОВАЯ для определения текущего местоположения */
  /* const requestFineLocationNow = useCallback(() => {
    if (granted) {
      return Geolocation.getCurrentPosition(
        (position: Geolocation.GeoPosition) => {
          logline('[requestFineLocation/position] now', position);
          setGeoLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error: Geolocation.GeoError) => {
          logline('[useGeolocaton] ', `${error.code} ${error.message}`);
        },
        { enableHighAccuracy: true },
      );
    }
  }, [granted, setGeoLocation]); */

  return (
    <AppButton margin={[2, 0, 0]} onPress={detectGeo}>
      <AppText medium center size={4}>
        Определить мое местоположение
      </AppText>
    </AppButton>
  );
}

const DetectLocationConnected = connect(
  ({ permission }: IRootState) => ({
    permissionLocation: permission.location,
  }),
  {
    setPermissionLocation: setPermissionLocationAction,
    detectGeo: detectGeoAction,
  },
)(DetectLocationContainer);

export { DetectLocationConnected as DetectLocation };
