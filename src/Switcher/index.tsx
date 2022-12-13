import {
  forwardRef,
  Children,
  cloneElement,
  ReactElement,
  HTMLAttributes,
} from "react";

export type SwitcherItemProps = {
  value: string;
  onClick?: () => void;
  active?: boolean;
  first?: boolean;
  last?: boolean;
};

export const Switcher = forwardRef<
  HTMLDivElement,
  {
    children: Array<ReactElement<SwitcherItemProps>>;
    value: string;
    onValueChange: (newValue: string) => void;
  } & Omit<HTMLAttributes<HTMLDivElement>, "children">
>(({ children, value, onValueChange, className = "", ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${className} flex h-12 mr-5 font-bold`}
    >
      {Children.map(children, (child, index) => {
        return (
          child &&
          cloneElement(child, {
            onClick: () => onValueChange(child.props.value),
            active: child.props.value === value,
            first: index === 0,
            last: index === children.length - 1,
          })
        );
      })}
    </div>
  );
});
Switcher.displayName = "Switcher";

export const SwitcherOption = forwardRef<
  HTMLDivElement,
  SwitcherItemProps & HTMLAttributes<HTMLDivElement>
>(({ value, active, first, last, className = "", ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${className}
        ${
          active
            ? "border-gray-700 z-20 text-gray-900"
            : "border-gray-500 text-gray-700"
        }
        ${first ? "rounded-l-md" : "-ml-px"}
        ${last ? "rounded-r-md" : ""}
        flex items-center border px-4 py-3 cursor-pointer
      `}
    />
  );
});
SwitcherOption.displayName = "SwitcherOption";
