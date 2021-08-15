import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppButton, AppText } from '~/src/app/common/components/UI';
import {
  detectGeo as detectGeoAction,
  detectCity as detectCityAction,
} from '~/src/features/map/store/mapActions';
import { checkPermissionLocation as checkPermissionLocationAction } from '~/src/app/store/permission/permissionActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { Permit } from '~/src/app/store/permission/permissionReducer';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  permissionLocation: [boolean, Permit];
  checkPermissionLocation: () => void;
  detectGeo: () => void;
  detectCity: () => void;
}

function DetectLocationContainer({
  permissionLocation,
  checkPermissionLocation,
  detectGeo,
  detectCity,
}: IProps) {
  const [granted] = permissionLocation;

  useEffect(() => {
    logline('granted changed +++++', granted);
  }, [granted]);

  useEffect(() => {
    checkPermissionLocation();
  }, [checkPermissionLocation]);

  useEffect(() => {
    if (granted) {
      detectGeo();
    }
  }, [detectGeo, granted]);

  function handleDetectCity() {
    if (granted) {
      detectCity();
    } else {
      checkPermissionLocation();
    }
  }

  return (
    <>
      <AppButton margin={[2, 0, 0]} onPress={handleDetectCity}>
        <AppText medium center size={4}>
          Определить мое местоположение
        </AppText>
      </AppButton>
      {/* <OpenSettingsButton>Open Settings</OpenSettingsButton> */}
    </>
  );
}

const DetectLocationConnected = connect(
  ({ permission }: IRootState) => ({
    permissionLocation: permission.location,
  }),
  {
    detectGeo: detectGeoAction,
    detectCity: detectCityAction,
    checkPermissionLocation: checkPermissionLocationAction,
  },
)(DetectLocationContainer);

export { DetectLocationConnected as DetectLocation };
