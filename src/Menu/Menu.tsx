import React, { forwardRef } from "react";
import noop from "lodash/noop";
import styles from "./index.module.css";
import { ComponentProps } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type ColorThemeValue = "light" | "dark";

const ColorContext = React.createContext<ColorThemeValue>("light");

export const Menu = ({
  color,
  ...menuProps
}: ComponentProps<typeof DropdownMenu.Root> & { color: "light" | "dark" }) => (
  <ColorContext.Provider value={color}>
    <DropdownMenu.Root modal={false} {...menuProps} />
  </ColorContext.Provider>
);
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
  Omit<ComponentProps<typeof DropdownMenu.Item>, "onSelect"> & {
    onClick?: () => void;
  }
>(({ disabled = false, onClick = noop, ...props }, ref) => (
  <DropdownMenu.Item
    {...props}
    ref={ref}
    disabled={disabled}
    className={`${
      props.className || ""
    } group-data-[color=dark]/dropdown:hover:bg-gray-800 group-data-[color=dark]/dropdown:py-[5px] flex cursor-pointer rounded p-2 px-5 outline-0 hover:bg-gray-100`}
    onSelect={disabled ? noop : (onClick as any)}
  />
));
MenuItem.displayName = "MenuItem";

export const MenuList = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof DropdownMenu.Content>
>(({ className = "", ...props }, ref) => {
  const color = useContextColor();
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        {...props}
        style={{ zIndex: 2147483001 }} // greater than Intercom button
        ref={ref}
        onClick={(event) => event.stopPropagation()}
        className={`${className} ${
          color === "dark"
            ? "bg-gray-900 py-4 text-gray-200"
            : "border border-gray-300 bg-white p-2"
        } ${styles[color]} ${
          styles.animated
        } group/dropdown max-w-[100vw] rounded text-sm shadow-md`}
        data-color={color}
      />
    </DropdownMenu.Portal>
  );
});
MenuList.displayName = "MenuList";

export const MenuButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof DropdownMenu.Trigger>
>((props, ref) => (
  <DropdownMenu.Trigger
    {...props}
    ref={ref}
    onClick={(e) => {
      e.stopPropagation();
      props.onClick?.(e);
    }}
  />
));
MenuButton.displayName = "MenuButton";
