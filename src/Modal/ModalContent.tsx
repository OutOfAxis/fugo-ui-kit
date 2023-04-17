import { forwardRef, ReactNode } from "react";

export const ModalContent = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => (
  <div ref={ref} className={`sm:flex-0 flex-1 py-4 px-4 sm:px-6 ${className}`}>
    {children}
  </div>
));
ModalContent.displayName = "ModalContent";
