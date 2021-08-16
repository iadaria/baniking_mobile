import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce/lib';
import { BathParam } from '~/src/app/models/bath';
import { logline } from '~/src/app/utils/debug';
import { clearBathes, setBathParam } from '../store/bathActions';

interface IProps {
  param: BathParam;
  deps: any[];
  shouldExecute?: boolean;
  isDelete?: boolean;
}

export function useDebounced({
  param,
  deps,
  shouldExecute = true,
  isDelete = false,
}: IProps) {
  const dispatch = useDispatch();

  // Выполняем запрос с задержкой после запроса
  const debouncedRequest = useDebouncedCallback(
    (p: BathParam) => {
      if (!param.prop) {
        dispatch(clearBathes());
      }
      dispatch(setBathParam(p));
    },
    2000,
    { maxWait: 3000 },
  );

  useEffect(() => {
    logline('[shouldExecute]', shouldExecute);
    if (!shouldExecute) return;
    // Удаляем свойство из параметров
    const value = isDelete ? undefined : param.value;
    // Присваиваем измененные параметры
    const newParams = { ...param, value };
    logline('[useDebounced] params', param);
    logline('[useDebounced] new_params', newParams);
    debouncedRequest(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRequest, ...deps]);
}
