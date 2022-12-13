import React, { forwardRef, MouseEventHandler, ReactNode } from "react";
import { Menu, MenuItem, MenuButton, MenuList } from "./Menu";
import { ButtonPrimary } from "../ButtonPrimary";
import { ReactComponent as ArrowDownIcon } from "./icons/arrow-down.svg";
import noop from "lodash/noop";
import { useIsMobile } from "../useScreenSize";
import { Tooltip } from "../Tooltip";

export const SplitButtonDropDown = forwardRef<
  any,
  {
    label: ReactNode;
    children: ReactNode;
    onClick?: MouseEventHandler;
    disabled?: boolean;
    disabledTooltip?: string;
  }
>(
  (
    { label, children, onClick = noop, disabled = false, disabledTooltip },
    ref
  ) => {
    const isMobile = useIsMobile();

    return isMobile ? (
      <Menu color="light" ref={ref}>
        {({ isExpanded }: { isExpanded: boolean }) => (
          <React.Fragment>
            <Tooltip label={disabledTooltip} hidden={!disabled}>
              <MenuButton disabled={disabled}>
                <ButtonPrimary
                  className="h-12 w-12 rounded-full flex justify-center items-center"
                  disabled={disabled}
                >
                  <span
                    className={`text-xl font-bold ${
                      isExpanded ? "transform rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </ButtonPrimary>
              </MenuButton>
            </Tooltip>
            <MenuList>{children}</MenuList>
          </React.Fragment>
        )}
      </Menu>
    ) : (
      <Tooltip label={disabledTooltip} hidden={!disabled}>
        <div className="flex items-center text-white">
          <ButtonPrimary
            disabled={disabled}
            className="rounded-r-none border-r"
            onClick={onClick}
          >
            {label}
          </ButtonPrimary>
          <Menu color="light">
            <MenuButton disabled={disabled}>
              <ButtonPrimary
                className="h-12 rounded-l-none flex"
                disabled={disabled}
              >
                <ArrowDownIcon className="stroke-current h-3 w-3" />
              </ButtonPrimary>
            </MenuButton>
            <MenuList>{React.Children.toArray(children).slice(1)}</MenuList>
          </Menu>
        </div>
      </Tooltip>
    );
  }
);
SplitButtonDropDown.displayName = "SplitButtonDropDown";

export { MenuItem };
