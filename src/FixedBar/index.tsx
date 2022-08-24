import { ReactNode } from "react";
import { useWindowSize } from "../useScreenSize";
import { useHeight } from "./useHeight";
import { useWidth } from "./useWidth";

export const FixedBar = ({
  children,
  className,
  defaultHeight,
}: {
  children: ReactNode;
  className?: string;
  defaultHeight?: number;
}) => {
  useWindowSize(); // to update if window size changed
  const [height, menuRef] = useHeight(defaultHeight);
  const [width, containerRef] = useWidth();
  return (
    <div ref={containerRef} style={{ height }}>
      <div
        ref={menuRef}
        className={`fixed w-full z-nav-bar ${className}`}
        style={{ width }}
      >
        {children}
      </div>
    </div>
  );
};
FixedBar.displayName = "FixedBar";
