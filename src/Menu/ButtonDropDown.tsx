import { ButtonPrimary } from "../ButtonPrimary";
import { ReactComponent as ArrowDownIcon } from "./icons/arrow-down.svg";
import { ComponentProps, forwardRef, ReactNode } from "react";
import { Menu, MenuList, MenuItem, MenuButton } from "./Menu";

export const ButtonDropDown = forwardRef<
  any,
  {
    className?: string;
    label: string;
    children: ReactNode;
  } & Pick<ComponentProps<typeof MenuList>, "side" | "align" | "sideOffset">
>(({ className = "", label, children, side, align, sideOffset }, ref) => (
  <Menu color="light">
    <MenuButton>
      <ButtonPrimary className={className} ref={ref}>
        {label}
        <ArrowDownIcon className="ml-2 h-3 w-3 stroke-current" />
      </ButtonPrimary>
    </MenuButton>
    <MenuList side={side} align={align} sideOffset={sideOffset}>
      {children}
    </MenuList>
  </Menu>
));
ButtonDropDown.displayName = "ButtonDropDown";

export { MenuItem };
