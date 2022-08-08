import { ReactNode } from "react";
interface TabProps {
  children: ReactNode;
  className?: string;
  id: string;
  label: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}
declare const Tab: ({ children, className }: TabProps) => JSX.Element;
export default Tab;
