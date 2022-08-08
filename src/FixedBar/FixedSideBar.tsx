import { ReactNode } from "react";
import { useWindowSize } from "../useScreenSize";
import { useTop } from "./useTop";
import { useWidth } from "./useWidth";

export const FixedSideBar = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  useWindowSize(); // to update if window size changed
  const [top, containerRef] = useTop();
  const [width, menuRef] = useWidth();
  return (
    <div className={className} style={{ width }} ref={containerRef}>
      <div ref={menuRef} className="fixed bottom-0" style={{ top }}>
        {children}
      </div>
    </div>
  );
};
