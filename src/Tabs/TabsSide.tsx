import React, { forwardRef, ReactElement, ReactNode } from "react";
import { FixedSideBar } from "../FixedBar/FixedSideBar";
import { Tab } from "./tab";

export const TabsSide = forwardRef<
  HTMLUListElement,
  {
    children: Array<
      ReactElement<{ id: string; label: string; icon: ReactNode }>
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
    ref
  ) => (
    <div className="flex flex-1">
      <FixedSideBar className="z-10 flex-shrink-0">
        <ul
          ref={ref}
          className={`bg-white h-full pt-12 pl-16 ${
            isFolded ? "pr-8" : "pr-10"
          } whitespace-nowrap space-y-10 border-r border-gray-300 ${className}`}
        >
          {React.Children.map(children, (child) => (
            <li
              className={`${tabClassName} ${
                activeTabId === child.props.id
                  ? "text-blue-600"
                  : "text-gray-500"
              } cursor-pointer whitespace-nowrap flex items-center font-bold text-sm`}
              onClick={() => onChange(child.props.id)}
            >
              <div className="w-6 h-6 mr-3">{child.props.icon}</div>
              {isFolded ? null : child.props.label}
            </li>
          ))}
        </ul>
      </FixedSideBar>
      {React.Children.toArray(children).find(
        (child: any) => child.props.id === activeTabId
      )}
    </div>
  )
);
TabsSide.displayName = "TabsSide";

export { Tab };
