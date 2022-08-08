import React from "react";

const ModalHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <>
    <div className={`${className} p-4`}>{children}</div>
    <div className="border-b border-gray-200 mx-auto" />
  </>
);

export default ModalHeader;
