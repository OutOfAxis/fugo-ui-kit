import { forwardRef, ReactNode } from "react";

export const ModalFooter = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => (
  <div
    className={`rounded-b-lg border-t border-gray-300 bg-gray-100 py-6 pl-4 pr-24 sm:pl-6 sm:pr-6 ${className}`}
    ref={ref}
  >
    {children}
  </div>
));
ModalFooter.displayName = "ModalFooter";
