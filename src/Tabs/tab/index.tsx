import { forwardRef, ReactNode } from "react";

export type TabProps = {
  children: ReactNode;
  className?: string;
  id: string;
  label: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
};

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ children, className = "" }, ref) => (
    <div ref={ref} className={`${className} flex-1 bg-gray-100`}>
      {children}
    </div>
  )
);
Tab.displayName = "Tab";
