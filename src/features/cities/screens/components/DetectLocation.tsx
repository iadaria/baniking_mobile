import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import { RESULTS } from 'react-native-permissions';
import {
  AppPermission,
  PERMISSION_TYPE,
} from '~/src/app/common/components/AppPersmission';
import { AppButton, AppText } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { setPermissionLocation as setPermissionLocationAction } from '~/src/app/store/permission/permissionActions';
import { setGeoLocation as setGeoLocationAction } from '~/src/features/auth/store/authActions';
import { ILocation } from '~/src/app/models/user';
import { showAlert } from '~/src/app/common/components/showAlert';
import { Permit } from '~/src/app/store/permission/permissionReducer';
import { logline } from '~/src/app/utils/debug';

const PERMISSION = PERMISSION_TYPE.location;

interface IProps {
  permissionLocation: [boolean, Permit];
  geolocation?: ILocation;
  setPermissionLocation: (payload: [boolean, Permit]) => void;
  setGeoLocation: (paylaod: ILocation) => void;
}

function DetectLocationContainer({
  permissionLocation,
  geolocation,
  setPermissionLocation,
  setGeoLocation,
}: IProps) {
  const [granted, permit] = permissionLocation;

  useEffect(() => {
    logline('[DetectLocation]', { geolocation });
  }, [geolocation]);

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
  const requestFineLocationNow = useCallback(() => {
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
  }, [granted, setGeoLocation]);

  return (
    <AppButton margin={[2, 0, 0]} onPress={requestFineLocationNow}>
      <AppText medium center size={4}>
        Определить мое местоположение
      </AppText>
    </AppButton>
  );
}

const DetectLocationConnected = connect(
  ({ permission, auth }: IRootState) => ({
    permissionLocation: permission.location,
    geolocation: auth.geolocation,
  }),
  {
    setPermissionLocation: setPermissionLocationAction,
    setGeoLocation: setGeoLocationAction,
  },
)(DetectLocationContainer);

export { DetectLocationConnected as DetectLocation };
