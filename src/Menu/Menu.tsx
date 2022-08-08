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

function Menu({
  color,
  ...menuProps
}: ComponentProps<typeof MenuReach> & { color: "light" | "dark" }) {
  return (
    <ColorContext.Provider value={color}>
      <MenuReach {...menuProps} />
    </ColorContext.Provider>
  );
}

function useContextColor() {
  const context = React.useContext(ColorContext);
  if (!context) {
    throw new Error(
      "Menu compound components cannot be rendered outside the Menu component"
    );
  }
  return context;
}

function MenuItem({
  disabled = false,
  onClick = noop,
  ...props
}: Omit<ComponentProps<typeof MenuItemReach>, "onSelect"> & {
  onClick?: () => void;
}) {
  return (
    <MenuItemReach
      {...props}
      className={`${props.className || ""} rounded`}
      onSelect={disabled ? noop : (onClick as any)}
    />
  );
}

const MenuList = ({
  portal = true,
  className = "",
  position = positionDefault,
  ...props
}: ComponentProps<typeof MenuItems> & ComponentProps<typeof MenuPopover>) => {
  const color = useContextColor();
  return (
    <MenuPopover
      portal={portal}
      position={position}
      style={{ zIndex: 2147483001 }} // greater than Intercom button
    >
      <MenuItems
        {...props}
        onClick={(event) => event.stopPropagation()}
        className={`${className} text-sm rounded shadow-lg ${styles[color]} ${styles.animated}`}
        data-reach-menu-list=""
      />
    </MenuPopover>
  );
};

const MenuButton = forwardRef<
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

export default Menu;
export { MenuItem, MenuList, MenuButton };
