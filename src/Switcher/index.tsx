import {
  forwardRef,
  Children,
  cloneElement,
  ReactElement,
  HTMLAttributes,
  ForwardedRef,
} from "react";

export type SwitcherItemProps<T extends unknown> = {
  value: T;
  onClick?: () => void;
  active?: boolean;
  first?: boolean;
  last?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type SwitcherProps<T extends unknown> = {
  children: Array<ReactElement<SwitcherItemProps<T>>>;
  value: T;
  onValueChange: (newValue: T) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

const SwitcherInner = <T extends unknown>(
  {
    children,
    value,
    onValueChange,
    className = "",
    ...props
  }: SwitcherProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div {...props} ref={ref} className={`${className} flex h-12 font-bold`}>
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
};

export const Switcher = forwardRef(SwitcherInner) as <T>(
  props: SwitcherProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof SwitcherInner>;
(Switcher as any).displayName = "Switcher";

const SwitcherItemInner = <T extends unknown>(
  {
    value,
    active,
    first,
    last,
    className = "",
    ...props
  }: SwitcherItemProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${className}
        ${
          active
            ? "z-20 border-gray-700 text-gray-900"
            : "border-gray-500 text-gray-700"
        }
        ${first ? "rounded-l-md" : "-ml-px"}
        ${last ? "rounded-r-md" : ""}
        flex cursor-pointer items-center border px-4 py-3
      `}
    />
  );
};

export const SwitcherOption = forwardRef(SwitcherItemInner) as <T>(
  props: SwitcherItemProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof SwitcherItemInner>;
(SwitcherOption as any).displayName = "SwitcherOption";
