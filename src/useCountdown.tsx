import { useEffect, useState } from "react";
import { useEventCallback } from "./useEventCallback";

export type Countdown = {
  value?: number;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  reset: (newValue?: number) => void;
};

export const useCountdown = (
  initialValueMs?: number,
  onEnd?: () => void,
  tickMs: number = 300
): Countdown => {
  const [value, setValue] = useState(initialValueMs);
  const [isPaused, setIsPaused] = useState(false);
  const onEndHandler = useEventCallback(() => {
    onEnd?.();
  });
  useEffect(() => {
    if (isPaused || value == null) {
      return;
    }
    if (value <= 0) {
      onEndHandler();
      return;
    }
    const timeoutId = setTimeout(() => {
      setValue(Math.max(value - tickMs, 0));
    }, tickMs);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPaused, onEndHandler, tickMs, value]);
  const reset = useEventCallback((newValue?: number) => {
    const newValueMs = newValue ?? initialValueMs;
    setValue(newValueMs);
    setIsPaused(false);
  });
  return {
    value,
    isPaused,
    setIsPaused,
    reset,
  };
};
