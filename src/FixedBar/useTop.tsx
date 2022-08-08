import { useState } from "react";

export const useTop = (): [number, (elem: HTMLElement | null) => void] => {
  const [top, setTop] = useState(0);
  const ref = (elem: HTMLElement | null) => {
    if (elem) {
      const newTop = elem.getBoundingClientRect().top + window.scrollY;
      if (top !== newTop) {
        setTop(newTop);
      }
    }
  };
  return [top, ref];
};
