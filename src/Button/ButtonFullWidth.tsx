import { ComponentProps } from "react";
import ButtonPrimary from "../ButtonPrimary";

export function ButtonFullWidth({
  children,
  className = "",
  ...props
}: ComponentProps<typeof ButtonPrimary>) {
  return (
    <ButtonPrimary
      {...props}
      className={`w-full py-4 tracking-wider ${className}`}
    >
      {children}
    </ButtonPrimary>
  );
}
