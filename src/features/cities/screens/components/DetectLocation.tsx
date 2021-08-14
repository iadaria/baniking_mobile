import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RESULTS } from 'react-native-permissions';
import { AppButton, AppText } from '~/src/app/common/components/UI';
import { showAlert } from '~/src/app/common/components/showAlert';
import { detectGeo as detectGeoAction } from '~/src/features/map/store/mapActions';
import { checkPermissionLocation as checkPermissionLocationAction } from '~/src/app/store/permission/permissionActions';
import { Permit } from '~/src/app/store/permission/permissionReducer';
import { IRootState } from '~/src/app/store/rootReducer';

interface IProps {
  permissionLocation: [boolean, Permit];
  checkPermissionLocation: () => void;
  detectGeo: () => void;
}

function DetectLocationContainer({
  permissionLocation,
  checkPermissionLocation,
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
      checkPermissionLocation();
    }
  }, [checkPermissionLocation, granted, permit]);

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
    detectGeo: detectGeoAction,
    checkPermissionLocation: checkPermissionLocationAction,
  },
)(DetectLocationContainer);

export { DetectLocationConnected as DetectLocation };
