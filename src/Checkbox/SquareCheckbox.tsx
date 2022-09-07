import { ReactComponent as InactiveIcon } from "./icons/square-checkbox-inactive.svg";
import { ReactComponent as ActiveIcon } from "./icons/square-checkbox-active.svg";
import { ReactComponent as IndeterminateIcon } from "./icons/square-checkbox-indeterminate.svg";
import { Checkbox, Props } from "./index";
import { forwardRef } from "react";

export const SquareCheckbox = forwardRef<HTMLDivElement, Props>(
  (props, ref) => (
    <Checkbox
      {...props}
      ref={ref}
      className={`w-7 h-7 ${props.className || ""}`}
      IndeterminateIcon={IndeterminateIcon}
      InactiveIcon={InactiveIcon}
      ActiveIcon={ActiveIcon}
    />
  )
);
SquareCheckbox.displayName = "SquareCheckbox";
