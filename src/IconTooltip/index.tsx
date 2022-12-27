import { Tooltip } from "../Tooltip";
import { Position } from "@reach/tooltip";
import { ReactNode, SVGAttributes } from "react";
import { ReactComponent as InfoIcon } from "../Icons/InfoIcon.svg";

export const IconTooltip = ({
  label,
  position,
  className = "",
  ...props
}: {
  label: ReactNode;
  position?: Position;
} & SVGAttributes<SVGSVGElement>) => {
  return (
    <Tooltip label={label} position={position}>
      <InfoIcon
        {...props}
        className={`${className} text-gray-600 hover:text-blue-600 transition-colors`}
      />
    </Tooltip>
  );
};
IconTooltip.displayName = "IconTooltip";
