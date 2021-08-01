import { useEffect, useState } from 'react';
import { RESULTS, openSettings } from 'react-native-permissions';
import { AppPermission } from '~/src/app/common/components/AppPersmission';
import { showAlert } from '~/src/app/common/components/showAlert';
import { logline } from '../utils/debug';

interface IProps {
  permission_type: string;
  setGranted: (state: boolean) => void;
  alert_message: string;
  warning_message: string;
  customeNeedCheck?: boolean;
  resetCustomeNeedCheck?: () => void;
}

export default function usePermission({
  permission_type,
  setGranted,
  alert_message,
  warning_message,
  customeNeedCheck,
  resetCustomeNeedCheck,
}: IProps) {
  const [needCheck, setNeedCheck] = useState<boolean>(true);
  const [permission, setPermission] = useState<[boolean, string]>([false, '']);

  useEffect(() => {
    if (!!customeNeedCheck && resetCustomeNeedCheck) {
      setNeedCheck(true);
      resetCustomeNeedCheck();
    }
  }, [customeNeedCheck, resetCustomeNeedCheck]);

  useEffect(() => {
    if (needCheck) {
      AppPermission.checkPermission(permission_type).then((result) => {
        const [granted] = result;
        setPermission(result); // Сохраняем текущие(измененные) права
        setGranted(granted); // Вернем значение в вызувающую функцию
        setNeedCheck(false); // Отмечаем, что проверка пройдена и не нужна
      });
    } else {
      logline(
        '',
        `\n[userPermission/useEffect/${permission_type}] needCheck is false`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needCheck]);

  // Проверка на разрешение использования ресурса и запрос на разрешение
  useEffect(() => {
    let timeId: NodeJS.Timeout;
    const [granted, permit] = permission;
    if (!granted && !needCheck) {
      if (
        !granted &&
        (permit === RESULTS.BLOCKED || permit === RESULTS.UNAVAILABLE)
      ) {
        showAlert(
          'Разрешение',
          alert_message,
          'Изменить разрешение',
          () => {
            openSettings();
            timeId = setTimeout(setNeedCheck.bind(false, true), 6000);
          },
          true,
        );
        /* } else if (!granted && permit === RESULTS.DENIED) {
        setNeedCheck(true); */
      } else if (!granted) {
        showAlert('Разрешение', warning_message);
      }
    }
    return () => clearTimeout(timeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission, needCheck]);

  /* if (permission) {
    return <NoPermissionPart setNeedCheck={setNeedCheck.bind(null, true)} />;
  } */
}
