import Menu, { MenuItem, MenuButton, MenuList } from "./Menu";
import ButtonPrimary from "../ButtonPrimary";
import { ReactComponent as ArrowDownIcon } from "./icons/arrow-down.svg";
import { ReactNode } from "react";

function ButtonDropDown({
  className = "",
  label,
  children,
}: {
  className?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Menu color="light">
      <MenuButton>
        <ButtonPrimary className={className}>
          {label}
          <ArrowDownIcon className="stroke-current h-3 w-3 ml-2" />
        </ButtonPrimary>
      </MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
}

export { MenuItem };
export default ButtonDropDown;
