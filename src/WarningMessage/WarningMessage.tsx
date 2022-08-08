import { HTMLAttributes, ReactNode } from "react";
import { ReactComponent as WarningIcon } from "./WarningIcon.svg";

export const WarningMessage = ({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`${
        props.className || ""
      } text-sm bg-orange-100 border border-orange-300 p-3 rounded-lg`}
    >
      <WarningIcon className="text-orange-500 inline mr-1 w-5" />
      {children}
    </div>
  );
};
