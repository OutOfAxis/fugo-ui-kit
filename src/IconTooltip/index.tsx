import { Tooltip } from "../Tooltip";
import { ComponentProps, SVGAttributes } from "react";
import { ReactComponent as InfoIcon } from "../Icons/InfoIcon.svg";

export const IconTooltip = ({
  className = "",
  hidden,
  label,
  side,
  sideOffset,
  align,
  alignOffset,
  ...props
}: Pick<
  ComponentProps<typeof Tooltip>,
  "hidden" | "label" | "align" | "alignOffset" | "side" | "sideOffset"
> &
  SVGAttributes<SVGSVGElement>) => {
  return (
    <Tooltip
      hidden={hidden}
      label={label}
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
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
