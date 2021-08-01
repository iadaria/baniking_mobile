import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce/lib';
import { BathParam } from '~/src/app/models/bath';
import { setBathParam } from '../store/bathActions';

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

  const debouncedRequest = useDebouncedCallback(
    (p: BathParam) => dispatch(setBathParam(p)),
    1500,
    { maxWait: 2000 },
  );

  useEffect(() => {
    if (!shouldExecute) return;
    const value = isDelete ? undefined : param.value;
    debouncedRequest({ ...param, value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRequest, ...deps]);
}
