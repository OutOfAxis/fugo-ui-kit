import { forwardRef, ReactNode } from "react";

const styles = {
  error: "bg-red-100 text-red-600",
  warning: "bg-orange-200 text-orange-600",
  info: "bg-purple-200 text-purple-600",
  success: "bg-green-100 text-green-600",
  default: "bg-blue-200 text-blue-600",
} as const;

export type TagColor = keyof typeof styles;

export const Tag = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    color?: TagColor;
    truncateable?: boolean;
    className?: string;
  }
>(
  (
    { children, color = "default", truncateable = false, className = "" },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${className} py-1 font-bold rounded text-xs xs:text-sm px-1 xs:px-2
          ${truncateable ? "block truncate" : "inline-block"}
          ${styles[color]}
        `}
      >
        {children}
      </div>
    );
  }
);
Tag.displayName = "Tag";
