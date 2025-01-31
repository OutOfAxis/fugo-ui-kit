import React, { forwardRef, ReactElement, ReactNode } from "react";
import { FixedSideBar } from "../FixedBar/FixedSideBar";
import { Tab } from "./tab";

export const TabsSide = forwardRef<
  HTMLUListElement,
  {
    children: Array<
      ReactElement<{
        id: string;
        label: string;
        icon: ReactNode;
        hidden?: boolean;
      }>
    >;
    activeTabId: string;
    onChange: (tabId: string) => void;
    className?: string;
    tabClassName?: string;
    isFolded?: boolean;
  }
>(
  (
    {
      children,
      activeTabId,
      onChange,
      className = "",
      tabClassName = "",
      isFolded = false,
    },
    ref,
  ) => (
    <div className="flex flex-1">
      <FixedSideBar className="z-10 flex-shrink-0">
        <ul
          ref={ref}
          className={`h-full bg-white pt-6 pl-4 sm:pt-12 sm:pl-16 ${
            isFolded ? "pr-4 sm:pr-8" : "pr-4 sm:pr-10"
          } space-y-10 whitespace-nowrap border-r border-gray-300 ${className}`}
        >
          {React.Children.map(children, (child) => (
            <li
              className={`${tabClassName} ${
                activeTabId === child.props.id
                  ? "text-blue-600"
                  : "text-gray-500"
              } ${
                child.props.hidden ? "hidden" : ""
              } flex cursor-pointer items-center whitespace-nowrap text-sm font-bold`}
              onClick={() => onChange(child.props.id)}
            >
              <div className={`h-6 w-6 ${isFolded ? "" : "mr-3"}`}>
                {child.props.icon}
              </div>
              {isFolded ? null : child.props.label}
            </li>
          ))}
        </ul>
      </FixedSideBar>
      {React.Children.toArray(children).find(
        (child: any) => child.props.id === activeTabId,
      )}
    </div>
  ),
);
TabsSide.displayName = "TabsSide";

export { Tab };
