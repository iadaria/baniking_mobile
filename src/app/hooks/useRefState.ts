import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useRefState = <T>(initialValue: T): [T, MutableRefObject<T>, (prop: T) => void] => {
  const [state, setState] = useState<T>(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return [state, stateRef, setState];
};
