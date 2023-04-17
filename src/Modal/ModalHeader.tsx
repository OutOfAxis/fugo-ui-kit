import React, { forwardRef } from "react";

export const ModalHeader = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => (
  <div ref={ref} className={`${className} px-6 pt-10 pb-4`}>
    {children}
  </div>
));
ModalHeader.displayName = "ModalHeader";
