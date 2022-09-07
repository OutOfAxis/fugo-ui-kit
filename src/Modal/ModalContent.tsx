import { forwardRef, ReactNode } from "react";

export const ModalContent = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => (
  <div ref={ref} className={`p-4 flex-1 sm:flex-0 ${className}`}>
    {children}
  </div>
));
ModalContent.displayName = "ModalContent";
