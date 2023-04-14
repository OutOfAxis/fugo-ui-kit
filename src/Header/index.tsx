import { forwardRef, ReactNode } from "react";
import { useIsMobile } from "../useScreenSize";

export const Header = forwardRef<
  HTMLHeadingElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => {
  const isMobile = useIsMobile();

  return (
    <h1
      ref={ref}
      className={`text-left font-bold leading-none text-gray-800
        ${isMobile ? "text-2xl" : "text-5xl"}
        ${className}
      `}
    >
      {children}
    </h1>
  );
});
Header.displayName = "Header";
