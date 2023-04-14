import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { ReactComponent as WarningIcon } from "./WarningIcon.svg";

export const WarningMessage = forwardRef<
  HTMLDivElement,
  { children: ReactNode } & HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`${
        props.className || ""
      } rounded-lg border border-orange-300 bg-orange-100 p-3 text-sm`}
    >
      <WarningIcon className="mr-1 inline w-5 text-orange-500" />
      {children}
    </div>
  );
});
WarningMessage.displayName = "WarningMessage";
