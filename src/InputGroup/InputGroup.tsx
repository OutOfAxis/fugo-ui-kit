import { HTMLAttributes, ReactNode } from "react";

export const InputGroup = ({
  header,
  description,
  children,
  ...props
}: {
  header: ReactNode;
  description?: ReactNode;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`${props.className ?? ""} space-y-3`}>
    <div className="text-xl text-gray-900">{header}</div>
    {description && <div className="text-gray-700">{description}</div>}
    {children}
  </div>
);
