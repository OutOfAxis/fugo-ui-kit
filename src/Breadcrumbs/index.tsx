import React, { ReactNode } from "react";

const Breadcrumbs = ({ children }: { children: ReactNode }) => {
  const lastIndex = React.Children.count(children) - 1;

  return (
    <ul className="flex uppercase font-semibold leading-none text-xs tracking-widest text-gray-700">
      {React.Children.map(children, (child, index) =>
        child ? renderSingle(child, index, lastIndex) : null
      )}
    </ul>
  );
};

const renderSingle = (child: ReactNode, index: number, lastIndex: number) => (
  <li key={`breadcrumb-${index}`}>
    {child}
    {lastIndex !== index && <span className="px-4">/</span>}
  </li>
);

export default Breadcrumbs;
