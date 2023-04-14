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
        className={`${className} ml-1 inline-block align-middle text-gray-500 transition-colors hover:text-blue-600`}
      />
    </Tooltip>
  );
};
IconTooltip.displayName = "IconTooltip";
