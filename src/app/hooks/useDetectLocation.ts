import { IRootState } from '~/src/app/store/rootReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPermissionLocation } from '~/src/app/store/permission/permissionActions';
import { detectGeo } from '~/src/features/map/store/mapActions';
import { logline } from '~/src/app/utils/debug';

export function useDetectLocation() {
  const { location } = useSelector(({ permission }: IRootState) => permission);

  logline('[useDetectLocation]', location);

  const [granted] = location;
  const dispatch = useDispatch();

  // Если из state получили что нет прав - запрашиваем снова
  useEffect(() => {
    if (!granted) {
      setTimeout(() => {
        dispatch(checkPermissionLocation());
      }, 2000);
    }
  }, [dispatch, granted]);

  // Если зи state получили что есть права - запрашиваем geo
  useEffect(() => {
    if (granted) {
      dispatch(detectGeo());
    }
  }, [dispatch, granted]);
}
