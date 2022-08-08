import { ReactNode } from "react";
import Menu, { MenuItem, MenuButton, MenuList } from "../Menu/Menu";
import { ReactComponent as Icon } from "./dots.svg";
import { Position } from "@reach/popover/dist/declarations/src";

function ThreeDotDropDown({
  children,
  position = undefined,
}: {
  children: ReactNode;
  position?: Position;
}) {
  return (
    <Menu color="dark">
      <MenuButton>
        <div className="h-8 w-8 flex items-center justify-center">
          <Icon className="h-4 w-4 cursor-pointer fill-current text-gray-500" />
        </div>
      </MenuButton>
      <MenuList position={position}>{children}</MenuList>
    </Menu>
  );
}

export default ThreeDotDropDown;
export { MenuItem };
