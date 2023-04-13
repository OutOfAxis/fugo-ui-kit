import { forwardRef, ReactNode } from "react";
import { MenuItem, MenuButton, MenuList, Menu } from "../Menu/Menu";
import { ReactComponent as Icon } from "./dots.svg";
import { Position } from "@reach/popover/dist/declarations/src";

export const ThreeDotDropDown = forwardRef<
  any,
  {
    children: ReactNode;
    className?: string;
    position?: Position;
    rotate?: boolean;
  }
>(({ children, className = "", position = undefined, rotate }, ref) => (
  <Menu ref={ref} color="dark">
    <MenuButton
      className={`${className} ${
        rotate ? "rotate-90 origin-center" : undefined
      }`}
    >
      <div className="h-8 w-8 flex items-center justify-center">
        <Icon className="h-4 w-4 cursor-pointer fill-current text-gray-700" />
      </div>
    </MenuButton>
    <MenuList position={position}>{children}</MenuList>
  </Menu>
));
ThreeDotDropDown.displayName = "ThreeDotDropDown";

export { MenuItem };
