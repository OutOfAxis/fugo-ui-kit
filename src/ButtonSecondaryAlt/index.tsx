import Button, { ButtonProps } from "../Button";
import { forwardRef } from "react";

const ButtonSecondaryAlt = forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, disabled = false, className = "", ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      disabled={disabled}
      className={`bg-white ${
        disabled ? `text-gray-500` : `text-gray-700`
      } !font-bold border border-transparent ${
        disabled ? `` : `hover:border-gray-500`
      } ${className}`}
    >
      {children}
    </Button>
  )
);
ButtonSecondaryAlt.displayName = "ButtonSecondaryAlt";

export default ButtonSecondaryAlt;
