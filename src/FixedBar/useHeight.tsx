import { useState } from "react";

export const useHeight = (
  defaultValue = 0
): [number, (elem: HTMLElement | null) => void] => {
  const [height, setHeight] = useState(defaultValue);
  const ref = (elem: HTMLElement | null) => {
    if (elem) {
      const rect = elem.getBoundingClientRect();
      if (rect.height !== height) {
        setHeight(rect.height);
      }
    }
  };
  return [height, ref];
};
