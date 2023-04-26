import { ComponentProps, forwardRef, ReactNode } from "react";
import { MenuItem, MenuButton, MenuList, Menu } from "../Menu/Menu";
import { ReactComponent as Icon } from "./dots.svg";

export const ThreeDotDropDown = forwardRef<
  any,
  {
    children: ReactNode;
    className?: string;
    rotate?: boolean;
  } & Pick<
    ComponentProps<typeof MenuList>,
    "side" | "align" | "sideOffset" | "alignOffset"
  >
>(
  (
    { children, className = "", rotate, side, sideOffset, align, alignOffset },
    ref
  ) => (
    <Menu color="dark">
      <MenuButton
        ref={ref}
        className={`${className} ${
          rotate ? "origin-center rotate-90" : undefined
        }`}
      >
        <div className="flex h-8 w-8 items-center justify-center">
          <Icon className="h-4 w-4 cursor-pointer fill-current text-gray-700" />
        </div>
      </MenuButton>
      <MenuList
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        {children}
      </MenuList>
    </Menu>
  )
);
ThreeDotDropDown.displayName = "ThreeDotDropDown";

export { MenuItem };
