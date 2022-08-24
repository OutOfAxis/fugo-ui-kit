import Button, { ButtonProps } from "../Button";
import { forwardRef } from "react";

const ButtonWarning = forwardRef<HTMLDivElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      className={`${className} border border-red-600 bg-red-100 text-red-600 hover:bg-red-200 !font-bold`}
    />
  )
);
ButtonWarning.displayName = "ButtonWarning";

export default ButtonWarning;
