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
      } text-sm bg-orange-100 border border-orange-300 p-3 rounded-lg`}
    >
      <WarningIcon className="text-orange-500 inline mr-1 w-5" />
      {children}
    </div>
  );
});
WarningMessage.displayName = "WarningMessage";
