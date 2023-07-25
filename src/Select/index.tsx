import { forwardRef, ReactNode } from "react";
import * as UiSelect from "@radix-ui/react-select";
import * as UiLabel from "@radix-ui/react-label";
import { ReactComponent as ArrowDownIcon } from "./arrow-down.svg";
import skeletonStyles from "../SkeletonElements/thumbnail-skeleton.module.css";

export const Select = forwardRef<
  any,
  {
    className?: string;
    buttonClassName?: string;
    children: ReactNode;
    label?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    isLoading?: boolean;
    buttonChildren?: ReactNode;
  }
>(
  (
    {
      className = "",
      buttonClassName = "",
      children,
      label = "",
      placeholder = "",
      onChange,
      value = "",
      disabled = false,
      isLoading = false,
      buttonChildren,
    },
    ref
  ) => {
    const Wrapper = label ? UiLabel.Root : "div";
    return (
      <Wrapper className={`${className} block`} ref={ref}>
        {label ? (
          <div className="mb-2 block text-left text-xs font-semibold uppercase tracking-widest text-gray-700">
            {label}
          </div>
        ) : null}
        <UiSelect.Root value={value || undefined} onValueChange={onChange}>
          <UiSelect.Trigger
            className={`${
              isLoading ? `${skeletonStyles.wave} relative overflow-hidden` : ""
            } ${buttonClassName} flex min-h-[3rem] w-full items-center justify-between overflow-hidden rounded border border-gray-300 bg-white px-4 py-1 text-left outline-none`}
            disabled={disabled}
          >
            <UiSelect.Value placeholder={placeholder}>
              {buttonChildren}
            </UiSelect.Value>
            <UiSelect.Icon>
              <ArrowDownIcon className="arrowDown ml-2 h-3 w-3 stroke-current text-blue-600" />
            </UiSelect.Icon>
          </UiSelect.Trigger>
          {children}
        </UiSelect.Root>
      </Wrapper>
    );
  }
);
Select.displayName = "Select";

export const SelectList = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    portal?: boolean;
    className?: string;
  }
>(({ className = "", children, portal = true }, ref) => {
  const content = (
    <UiSelect.Content
      ref={ref}
      className={`${className} z-in-modal rounded border border-gray-300 bg-white shadow`}
    >
      <UiSelect.ScrollUpButton className="flex h-6 rotate-180 transform items-center justify-center">
        <ArrowDownIcon className="arrowDown h-3 w-3 stroke-current text-gray-700" />
      </UiSelect.ScrollUpButton>
      <UiSelect.Viewport>{children}</UiSelect.Viewport>
      <UiSelect.ScrollDownButton className="flex h-6 items-center justify-center">
        <ArrowDownIcon className="arrowDown h-3 w-3 stroke-current text-gray-700" />
      </UiSelect.ScrollDownButton>
    </UiSelect.Content>
  );
  if (portal) {
    return <UiSelect.Portal>{content}</UiSelect.Portal>;
  }
  return content;
});
SelectList.displayName = "SelectList";

export const Option = forwardRef<
  HTMLDivElement,
  {
    value: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
  }
>(({ value, children, className = "", disabled }, ref) => {
  return (
    <UiSelect.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={`
        ${className}
        flex min-h-[3rem] cursor-pointer items-center px-4 py-2
        outline-none hover:bg-gray-100
        [&[data-state="checked"]]:font-bold
      `}
    >
      <UiSelect.ItemText>{children}</UiSelect.ItemText>
    </UiSelect.Item>
  );
});
Option.displayName = "Option";
