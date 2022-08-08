import { ReactElement } from "react";
import { useIsMobile } from "../useScreenSize";

const colors = {
  success: "text-green-400",
  error: "text-red-500",
  warning: "text-yellow-300",
  muted: "text-gray-600",
} as const;

const StatusDot = ({
  color,
  label,
}: {
  color: keyof typeof colors;
  label: string;
}): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <div className={`text-sm font-bold whitespace-nowrap ${colors[color]}`}>
      •&nbsp;
      {!isMobile && label}
    </div>
  );
};

export default StatusDot;
