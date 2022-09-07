import React, { ChangeEvent, forwardRef } from "react";
import { ReactComponent as CircleInactiveIcon } from "./icons/checkbox-inactive.svg";
import { ReactComponent as CircleActiveIcon } from "./icons/checkbox-active.svg";
import { ReactComponent as CircleIndeterminateIcon } from "./icons/checkbox-indeterminate.svg";
import { CustomCheckboxContainer, CustomCheckboxInput } from "@reach/checkbox";

import "@reach/checkbox/styles.css";
import "./index.module.css";

export const Checkbox = forwardRef<HTMLDivElement, Props>(
  (
    {
      disabled,
      value,
      onChange,
      className,
      IndeterminateIcon = CircleIndeterminateIcon,
      ActiveIcon = CircleActiveIcon,
      InactiveIcon = CircleInactiveIcon,
    },
    ref
  ) => {
    const classes =
      value === true
        ? "text-blue-500 hover:text-blue-600 fill-current"
        : "text-gray-400 hover:text-gray-700 stroke-current";

    return (
      <div className={`w-6 h-6 ${className}`} ref={ref}>
        <CustomCheckboxContainer
          checked={value}
          onChange={onChange}
          disabled={disabled}
        >
          <span aria-hidden className={`cursor-pointer ${classes}`}>
            {value === "mixed" ? (
              <IndeterminateIcon />
            ) : value === true ? (
              <ActiveIcon />
            ) : (
              <InactiveIcon />
            )}
            <CustomCheckboxInput disabled={disabled} />
          </span>
        </CustomCheckboxContainer>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export interface Props {
  disabled?: boolean;
  value?: boolean | "mixed";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  IndeterminateIcon?: React.ComponentType;
  ActiveIcon?: React.ComponentType;
  InactiveIcon?: React.ComponentType;
}
