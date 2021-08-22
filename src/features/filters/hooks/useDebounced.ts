import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce/lib';
import { clearBathes } from '../../bathes/store/bathActions';
import { BathMainParams, IBathMainParams } from '~/src/app/models/filter';
import { changeParams } from '../base/store/baseFilterActions';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  //type Partial<T> = { [P in keyof T]?: T[P] | undefined;
  prop?: 'params' | 'extraParams' | 'geoParams';
  params: Partial<IBathMainParams>;
  deps: any[];
  shouldExecute?: boolean;
  timeout?: number;
  isDelete?: boolean;
  unmount?: () => void;
}

export function useDebounced({
  prop = 'params',
  params,
  deps,
  shouldExecute = true,
  timeout = 2000,
  isDelete = false,
  unmount = () => {},
}: IProps) {
  const dispatch = useDispatch();

  const isBase = prop === 'params';

  // Выполняем запрос с задержкой после запроса
  const debouncedRequest = useDebouncedCallback(
    (p: BathMainParams) => {
      if (isBase) {
        dispatch(clearBathes());
      }
      dispatch(changeParams(p));
    },
    timeout,
    { maxWait: 3000 },
  );

  useEffect(() => {
    logline('[shouldExecute]', shouldExecute);
    if (!shouldExecute) {
      return;
    }
    // Удаляем свойство из параметров
    logline('[useDebounced] params', params);
    // Присваиваем измененные параметры
    debouncedRequest({ prop, params, isDelete });
    return unmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRequest, ...deps]);
}
