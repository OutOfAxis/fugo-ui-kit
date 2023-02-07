import { useCallback, useLayoutEffect, useRef } from "react";

type Fn = (...args: any[]) => any;

interface EventCallbackHook {
  <F extends Fn | undefined>(fn: F): (
    ...args: F extends Fn ? Parameters<F> : any
  ) => F extends Fn ? ReturnType<F> : undefined;
}

export const useEventCallback: EventCallbackHook = <F extends Fn | undefined>(
  fn: F
) => {
  const callbackRef = useRef(fn);

  useLayoutEffect(() => {
    callbackRef.current = fn;
  });

  return useCallback((...args: any) => callbackRef.current?.(...args), []);
};
