import { forwardRef, HTMLAttributes } from "react";

const colors = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  muted: "text-gray-600",
} as const;

export type StatusDotColor = keyof typeof colors;

export const StatusDot = forwardRef<
  HTMLDivElement,
  {
    color: StatusDotColor;
    label: string;
    labelProps?: HTMLAttributes<HTMLSpanElement>;
    className?: string;
  } & HTMLAttributes<HTMLDivElement>
>(({ color, label, labelProps, className = "", ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`text-sm font-bold whitespace-nowrap ${colors[color]} ${className}`}
    >
      •
      <span className="hidden sm:inline" {...labelProps}>
        &nbsp;{label}
      </span>
    </div>
  );
});
StatusDot.displayName = "StatusDot";
