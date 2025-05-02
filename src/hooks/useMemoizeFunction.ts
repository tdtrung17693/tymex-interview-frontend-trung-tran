import { useCallback, useEffect, useRef } from 'react';

type Fn = (...args: any[]) => any;

// This hook is ensuring that the function identity is stable, even if the function is unstable.
// To  re-rendering as well as stale closure.
export function useMemoizeFunction<T extends Fn>(fn: T): T {
  const fnRef = useRef<T>(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const memoizedFn = useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      return fnRef.current(...args);
    },
    [],
  );

  return memoizedFn as T;
}
