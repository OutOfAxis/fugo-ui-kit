import { MenuItem, MenuButton, MenuList, Menu } from "./Menu";
import { ButtonPrimary } from "../ButtonPrimary";
import { ReactComponent as ArrowDownIcon } from "./icons/arrow-down.svg";
import { forwardRef, ReactNode } from "react";

export const ButtonDropDown = forwardRef<
  any,
  {
    className?: string;
    label: string;
    children: ReactNode;
  }
>(({ className = "", label, children }, ref) => (
  <Menu ref={ref} color="light">
    <MenuButton>
      <ButtonPrimary className={className}>
        {label}
        <ArrowDownIcon className="stroke-current h-3 w-3 ml-2" />
      </ButtonPrimary>
    </MenuButton>
    <MenuList>{children}</MenuList>
  </Menu>
));
ButtonDropDown.displayName = "ButtonDropDown";

export { MenuItem };
