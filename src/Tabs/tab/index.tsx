import { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
  className?: string;
  id: string;
  label: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

const Tab = ({ children, className = "" }: TabProps) => (
  <div className={`${className} flex-1 bg-gray-100`}>{children}</div>
);

export default Tab;
