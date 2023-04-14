import { Button, ButtonProps } from "../Button";
import { forwardRef } from "react";

export const ButtonWarning = forwardRef<HTMLDivElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      className={`${className} border border-red-600 bg-red-100 !font-bold text-red-600 hover:bg-red-200`}
    />
  )
);
ButtonWarning.displayName = "ButtonWarning";
