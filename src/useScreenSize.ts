import { useLayoutEffect, useState } from "react";
import useMedia from "use-media";

export const MAX_MOBILE_SIZE = 639;
export const MAX_TABLET_SIZE = 1023;

export const useScreenSize = (maxWidth: number) => useMedia({ maxWidth });

export const useIsMobile = () => useScreenSize(MAX_MOBILE_SIZE);
export const useIsMobileOrTablet = () => useScreenSize(MAX_TABLET_SIZE);

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
