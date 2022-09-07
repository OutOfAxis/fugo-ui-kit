import React, { forwardRef } from "react";

export const ModalHeader = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => (
  <>
    <div className={`${className} p-4`}>{children}</div>
    <div className="border-b border-gray-200 mx-auto" ref={ref} />
  </>
));
ModalHeader.displayName = "ModalHeader";
