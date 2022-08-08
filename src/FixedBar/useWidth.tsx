import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useWidth = (
  defaultWidth = "100%"
): [number | string, (elem: HTMLElement | null) => void] => {
  const [width, setWidth] = useState<number | string>(defaultWidth);
  const onWidthChange = useDebouncedCallback(
    (value: number) => {
      setWidth(value);
    },
    200,
    {
      leading: true,
      trailing: true,
      maxWait: 1000,
    }
  );
  const ref = (elem: HTMLElement | null) => {
    if (elem && elem.offsetWidth !== width) {
      onWidthChange(elem.offsetWidth);
    }
  };
  return [width, ref];
};
