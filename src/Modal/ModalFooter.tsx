import { forwardRef, ReactNode } from "react";

export const ModalFooter = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => (
  <div
    className={`rounded-b-lg border-t border-gray-300 bg-gray-100 p-4 ${className}`}
    ref={ref}
  >
    {children}
  </div>
));
ModalFooter.displayName = "ModalFooter";
