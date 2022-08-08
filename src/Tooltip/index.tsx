import ReachTooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import { PRect } from "@reach/rect";
import "./index.module.css";
import { ComponentProps } from "react";

const centered = (triggerRect?: PRect | null, tooltipRect?: PRect | null) => {
  const triggerCenter =
    (triggerRect?.left || 0) + (triggerRect?.width || 0) / 2;
  const left = triggerCenter - (tooltipRect?.width || 0) / 2;
  const maxLeft = window.innerWidth - (tooltipRect?.width || 0) - 2;
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: (triggerRect?.bottom || 0) + 8 + window.scrollY,
  };
};

export const Tooltip = (props: ComponentProps<typeof ReachTooltip>) => {
  if (props.hidden) {
    return <>{props.children}</>;
  }
  return (
    <ReachTooltip
      {...props}
      className={`${props.className || ""} !z-in-modal`}
      position={props.position || centered}
    />
  );
};
