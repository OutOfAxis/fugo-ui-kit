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
    <Tooltip
      label={label}
      position={position}
      className="max-w-screen-xs whitespace-normal"
    >
      <InfoIcon
        {...props}
        className={`${className} text-gray-500 hover:text-blue-600 transition-colors align-middle ml-1 inline-block`}
      />
    </Tooltip>
  );
};
IconTooltip.displayName = "IconTooltip";
