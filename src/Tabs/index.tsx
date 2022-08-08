import React, { ComponentProps, ReactElement } from "react";
import Tab from "./tab";

export type TabElement = ReactElement<ComponentProps<typeof Tab>>;
export type TabsChildren = Array<TabElement> | TabElement;

const Tabs = ({
  children,
  activeTabId,
  onChange,
  className = "",
  tabClassName = "",
}: {
  children: TabsChildren;
  activeTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  tabClassName?: string;
}) => (
  <>
    <ul className={`overflow-x-auto whitespace-nowrap ${className}`}>
      {React.Children.map(children, (child) =>
        child ? (
          <li
            className={`${tabClassName} ${
              child.props.disabled ? "text-gray-500" : ""
            } ${
              activeTabId === child.props.id
                ? "border-b-2 border-blue-500 font-bold transition duration-300 ease-in-out"
                : ""
            } cursor-pointer whitespace-nowrap inline-block
            py-2 mx-6 my-1 first:pl-0 last:pr-0 first:ml-0 last:mr-0 mb-0`}
            onClick={
              child.props.disabled
                ? undefined
                : () => onChange?.(child.props.id)
            }
          >
            {child.props.label}
          </li>
        ) : null
      )}
    </ul>
    {React.Children.toArray(children).find(
      (child: any) => child.props.id === activeTabId
    )}
  </>
);

export { Tab };
export default Tabs;
