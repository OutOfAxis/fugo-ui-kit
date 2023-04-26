import React, {
  ComponentProps,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from "react";
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
  } & Pick<ComponentProps<typeof MenuList>, "side" | "align" | "sideOffset">
>(
  (
    {
      label,
      children,
      onClick = noop,
      disabled = false,
      disabledTooltip,
      ButtonComponent = ButtonPrimary,
      align,
      side,
      sideOffset,
    },
    ref
  ) => {
    const isMobile = useIsMobile();

    return isMobile ? (
      <Menu color="light">
        <React.Fragment>
          <Tooltip label={disabledTooltip} hidden={!disabled}>
            <MenuButton disabled={disabled} className="group/dropdown">
              <ButtonComponent
                ref={ref}
                className="flex h-12 w-12 items-center justify-center rounded-full"
                disabled={disabled}
              >
                <span
                  className={`group-data-[state=open]/dropdown:rotate-45 text-xl font-bold`}
                >
                  +
                </span>
              </ButtonComponent>
            </MenuButton>
          </Tooltip>
          <MenuList align={align} side={side} sideOffset={sideOffset}>
            {children}
          </MenuList>
        </React.Fragment>
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
                className="flex h-12 rounded-l-none"
                disabled={disabled}
              >
                <ArrowDownIcon className="h-3 w-3 stroke-current" />
              </ButtonComponent>
            </MenuButton>
            <MenuList align={align} side={side} sideOffset={sideOffset}>
              {React.Children.toArray(children).slice(1)}
            </MenuList>
          </Menu>
        </div>
      </Tooltip>
    );
  }
);
SplitButtonDropDown.displayName = "SplitButtonDropDown";

export { MenuItem };
