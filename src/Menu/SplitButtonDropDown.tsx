import React, { forwardRef, MouseEventHandler, ReactNode } from "react";
import { Menu, MenuItem, MenuButton, MenuList } from "./Menu";
import { ButtonPrimary } from "../ButtonPrimary";
import { ReactComponent as ArrowDownIcon } from "./icons/arrow-down.svg";
import noop from "lodash/noop";
import { useIsMobile } from "../useScreenSize";
import { Tooltip } from "../Tooltip";
import { ButtonProps } from "../Button";

export const SplitButtonDropDown = forwardRef<
  any,
  {
    label: ReactNode;
    children: ReactNode;
    onClick?: MouseEventHandler;
    disabled?: boolean;
    disabledTooltip?: string;
    ButtonComponent?: React.ComponentType<ButtonProps>;
  }
>(
  (
    {
      label,
      children,
      onClick = noop,
      disabled = false,
      disabledTooltip,
      ButtonComponent = ButtonPrimary,
    },
    ref
  ) => {
    const isMobile = useIsMobile();

    return isMobile ? (
      <Menu color="light" ref={ref}>
        {({ isExpanded }: { isExpanded: boolean }) => (
          <React.Fragment>
            <Tooltip label={disabledTooltip} hidden={!disabled}>
              <MenuButton disabled={disabled}>
                <ButtonComponent
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
                </ButtonComponent>
              </MenuButton>
            </Tooltip>
            <MenuList>{children}</MenuList>
          </React.Fragment>
        )}
      </Menu>
    ) : (
      <Tooltip label={disabledTooltip} hidden={!disabled}>
        <div className="flex items-center text-white">
          <ButtonComponent
            disabled={disabled}
            className="rounded-r-none border-r"
            onClick={onClick}
          >
            {label}
          </ButtonComponent>
          <Menu color="light">
            <MenuButton disabled={disabled}>
              <ButtonComponent
                className="h-12 rounded-l-none flex"
                disabled={disabled}
              >
                <ArrowDownIcon className="stroke-current h-3 w-3" />
              </ButtonComponent>
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
