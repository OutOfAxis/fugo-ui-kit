import { forwardRef } from "react";
import { useIsMobile } from "../useScreenSize";

const colors = {
  success: "text-green-400",
  error: "text-red-500",
  warning: "text-yellow-300",
  muted: "text-gray-600",
} as const;

export const StatusDot = forwardRef<
  HTMLDivElement,
  {
    color: keyof typeof colors;
    label: string;
    className?: string;
  }
>(({ color, label, className = "" }, ref) => {
  const isMobile = useIsMobile();

  return (
    <div
      ref={ref}
      className={`text-sm font-bold whitespace-nowrap ${colors[color]} ${className}`}
    >
      •&nbsp;
      {!isMobile && label}
    </div>
  );
});
StatusDot.displayName = "StatusDot";
