import { useEffect, useState } from "react";

export const useTemporaryState = <T extends unknown>(
  timeout: number,
  initialState?: T
) => {
  const stateItems = useState<T | undefined>(initialState);
  const [state, setState] = stateItems;
  useEffect(() => {
    if (state !== undefined) {
      const timerId = setTimeout(() => setState(undefined), timeout);
      return () => clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, timeout]);
  return stateItems;
};
