import React, { ComponentProps, forwardRef, ReactElement } from "react";
import { Tab } from "./tab";

export type TabElement = ReactElement<ComponentProps<typeof Tab>> | null;
export type TabsChildren = Array<TabElement> | TabElement;

export const Tabs = forwardRef<
  HTMLUListElement,
  {
    children: TabsChildren;
    activeTabId?: string;
    onChange?: (tabId: string) => void;
    className?: string;
    tabClassName?: string;
  }
>(
  (
    { children, activeTabId, onChange, className = "", tabClassName = "" },
    ref
  ) => (
    <>
      <ul
        ref={ref}
        className={`overflow-x-auto whitespace-nowrap ${className}`}
      >
        {React.Children.map(children, (child) =>
          child ? (
            <li
              data-tabid={child.props.id}
              className={`${tabClassName} ${
                child.props.disabled ? "text-gray-500" : ""
              } ${
                activeTabId === child.props.id
                  ? "border-b-2 border-blue-500 font-bold transition duration-300 ease-in-out"
                  : ""
              } mx-2 my-1 mb-0
            inline-block cursor-pointer whitespace-nowrap py-2 first:ml-0 first:pl-0 last:mr-0 last:pr-0 sm:mx-6`}
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
  )
);
Tabs.displayName = "Tabs";

export { Tab };
