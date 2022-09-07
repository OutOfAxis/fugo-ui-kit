import { forwardRef, ReactNode } from "react";

export const ModalFooter = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => (
  <div
    className={`p-4 bg-gray-100 rounded-b-lg border-t border-gray-300 shadow-lg ${className}`}
    ref={ref}
  >
    {children}
  </div>
));
ModalFooter.displayName = "ModalFooter";
