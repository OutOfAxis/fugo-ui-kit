import Button, { ButtonProps } from "../Button";
import { forwardRef } from "react";

export const ButtonDanger = forwardRef<HTMLDivElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      className={`${className} bg-red-600 text-white hover:bg-red-400 font-bold`}
    />
  )
);
ButtonDanger.displayName = "ButtonDanger";

export default ButtonDanger;
