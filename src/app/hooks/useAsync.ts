import { useEffect } from 'react';

export function useAsync(asyncFn: Function, onSuccess: Function) {
  useEffect(() => {
    let isMounted = true;
    asyncFn().then((data: any) => {
      if (isMounted) {
        onSuccess(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [asyncFn, onSuccess]);
}
