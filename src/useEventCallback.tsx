import { useCallback, useLayoutEffect, useRef } from "react";

type Fn = (...args: any[]) => any;

interface EventCallbackHook {
  <F extends Fn>(fn: F): (...args: Parameters<F>) => ReturnType<F>;
}

export const useEventCallback: EventCallbackHook = <F extends Fn>(fn: F) => {
  const callbackRef = useRef(fn);

  useLayoutEffect(() => {
    callbackRef.current = fn;
  });

  return useCallback(
    (...args: Parameters<F>) => callbackRef.current(...(args as any)),
    []
  );
};
