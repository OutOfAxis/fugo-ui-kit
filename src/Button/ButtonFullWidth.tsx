import { ComponentProps, forwardRef } from "react";
import ButtonPrimary from "../ButtonPrimary";

export const ButtonFullWidth = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof ButtonPrimary>
>(({ children, className = "", ...props }, ref) => (
  <ButtonPrimary
    {...props}
    ref={ref}
    className={`w-full py-4 tracking-wider ${className}`}
  >
    {children}
  </ButtonPrimary>
));
ButtonFullWidth.displayName = "ButtonFullWidth";
