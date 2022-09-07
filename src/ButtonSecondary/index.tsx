import { Button, ButtonProps } from "../Button";
import { forwardRef } from "react";

export const ButtonSecondary = forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, disabled = false, className = "", ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      disabled={disabled}
      className={`${
        disabled
          ? `bg-gray-200 text-gray-500`
          : `bg-white hover:bg-gray-300 text-gray-700`
      } !font-bold border border-gray-500 ${className}`}
    >
      {children}
    </Button>
  )
);
ButtonSecondary.displayName = "ButtonSecondary";
