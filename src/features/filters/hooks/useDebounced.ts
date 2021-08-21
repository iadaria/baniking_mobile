import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce/lib';
import { clearBathes } from '../../bathes/store/bathActions';
import { BathMainParams, IBathMainParams } from '~/src/app/models/filter';
import { changeParams } from '../base/store/baseFilterActions';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  params: Partial<IBathMainParams>;
  deps: any[];
  shouldExecute?: boolean;
  timeout?: number;
  isClearBathes?: boolean;
  isDelete?: boolean;
  unmount?: () => void;
}

export function useDebounced({
  params,
  deps,
  shouldExecute = true,
  timeout = 2000,
  isClearBathes = false,
  isDelete = false,
  unmount = () => {},
}: IProps) {
  const dispatch = useDispatch();

  // Выполняем запрос с задержкой после запроса
  const debouncedRequest = useDebouncedCallback(
    (p: BathMainParams) => {
      if (!isClearBathes) {
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
    debouncedRequest({ params, isDelete });
    return unmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRequest, ...deps]);
}
