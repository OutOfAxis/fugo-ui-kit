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
    <div className="mx-auto border-b border-gray-200" ref={ref} />
  </>
));
ModalHeader.displayName = "ModalHeader";
