import { ReactNode } from "react";

const ModalFooter = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`p-4 bg-gray-100 rounded-b-lg border-t border-gray-300 shadow-lg ${className}`}
  >
    {children}
  </div>
);

export default ModalFooter;
