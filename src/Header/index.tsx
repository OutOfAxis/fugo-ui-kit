import { ReactNode } from "react";
import { useIsMobile } from "../useScreenSize";

const Header = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const isMobile = useIsMobile();

  return (
    <h1
      className={`text-gray-800 font-bold leading-none text-left
      ${isMobile ? "text-2xl" : "text-5xl"}
      ${className}
    `}
    >
      {children}
    </h1>
  );
};

export default Header;
