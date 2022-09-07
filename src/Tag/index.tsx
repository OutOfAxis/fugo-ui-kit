import { forwardRef, ReactNode } from "react";
import { useIsMobile } from "../useScreenSize";

const styles = {
  error: "bg-red-100 text-red-500",
  info: "bg-purple-100 text-purple-500",
  success: "bg-green-100 text-green-500",
  default: "bg-blue-600 text-white",
} as const;

export const Tag = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    color?: keyof typeof styles;
    truncateable?: boolean;
  }
>(({ children, color = "default", truncateable = false }) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`uppercase py-1 font-bold rounded
        ${truncateable ? "block truncate" : "inline-block"}
        ${isMobile ? "text-xs px-1" : "text-xs px-2"}
        ${styles[color]}
      `}
    >
      {children}
    </div>
  );
});
Tag.displayName = "Tag";
