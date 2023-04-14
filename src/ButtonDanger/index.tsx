import { Button, ButtonProps } from "../Button";
import { forwardRef } from "react";

export const ButtonDanger = forwardRef<HTMLDivElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      className={`${className} bg-red-600 font-bold text-white hover:bg-red-400`}
    />
  )
);
ButtonDanger.displayName = "ButtonDanger";
