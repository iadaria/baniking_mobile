import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce/lib';
import { BathParam } from '~/src/app/models/bath';
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
    1500,
    { maxWait: 2000 },
  );

  useEffect(() => {
    if (!shouldExecute) return;
    // Удаляем свойство из параметров
    const value = isDelete ? undefined : param.value;
    // Присваиваем измененные параметры
    debouncedRequest({ ...param, value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRequest, ...deps]);
}
