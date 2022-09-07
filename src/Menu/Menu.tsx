import React, { forwardRef } from "react";
import noop from "lodash/noop";
import {
  Menu as MenuReach,
  MenuButton as MenuButtonReach,
  MenuItem as MenuItemReach,
  MenuPopover,
  MenuItems,
} from "@reach/menu-button";
import { positionDefault } from "@reach/popover";
import styles from "./index.module.css";
import { ComponentProps } from "react";

type ColorThemeValue = "light" | "dark";

const ColorContext = React.createContext<ColorThemeValue>("light");

export const Menu = forwardRef<
  any,
  ComponentProps<typeof MenuReach> & { color: "light" | "dark" }
>(({ color, ...menuProps }, ref) => (
  <ColorContext.Provider value={color}>
    <MenuReach {...menuProps} ref={ref} />
  </ColorContext.Provider>
));
Menu.displayName = "Menu";

function useContextColor() {
  const context = React.useContext(ColorContext);
  if (!context) {
    throw new Error(
      "Menu compound components cannot be rendered outside the Menu component"
    );
  }
  return context;
}

export const MenuItem = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<typeof MenuItemReach>, "onSelect"> & {
    onClick?: () => void;
  }
>(({ disabled = false, onClick = noop, ...props }, ref) => (
  <MenuItemReach
    {...props}
    ref={ref}
    className={`${props.className || ""} rounded`}
    onSelect={disabled ? noop : (onClick as any)}
  />
));
MenuItem.displayName = "MenuItem";

export const MenuList = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof MenuItems> & ComponentProps<typeof MenuPopover>
>(
  (
    { portal = true, className = "", position = positionDefault, ...props },
    ref
  ) => {
    const color = useContextColor();
    return (
      <MenuPopover
        portal={portal}
        position={position}
        style={{ zIndex: 2147483001 }} // greater than Intercom button
      >
        <MenuItems
          {...props}
          ref={ref}
          onClick={(event) => event.stopPropagation()}
          className={`${className} text-sm rounded shadow-lg ${styles[color]} ${styles.animated}`}
          data-reach-menu-list=""
        />
      </MenuPopover>
    );
  }
);
MenuList.displayName = "MenuList";

export const MenuButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof MenuButtonReach>
>((props, ref) => (
  <MenuButtonReach
    {...props}
    ref={ref}
    onClick={(e) => {
      e.stopPropagation();
      if (props.onClick) {
        props.onClick(e);
      }
    }}
  />
));
MenuButton.displayName = "MenuButton";
