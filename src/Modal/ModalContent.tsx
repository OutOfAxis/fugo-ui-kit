import React from "react";

const ModalContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-4 flex-1 sm:flex-0 ${className}`}>{children}</div>;

export default ModalContent;
