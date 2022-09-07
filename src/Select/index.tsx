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
          <div className="block mb-2 text-xs font-semibold tracking-widest text-left text-gray-700 uppercase">
            {label}
          </div>
        ) : null}
        <UiSelect.Root value={value || undefined} onValueChange={onChange}>
          <UiSelect.Trigger
            className={`${
              isLoading ? `${skeletonStyles.wave} overflow-hidden relative` : ""
            } ${buttonClassName} text-gray-900 flex items-center justify-between text-left bg-white rounded border border-gray-500 min-h-[3rem] outline-none px-4 py-1 w-full overflow-hidden`}
            disabled={disabled}
          >
            <UiSelect.Value placeholder={placeholder}>
              {buttonChildren}
            </UiSelect.Value>
            <UiSelect.Icon>
              <ArrowDownIcon className="ml-2 w-3 h-3 stroke-current text-blue-600 arrowDown" />
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
>(({ className, children, portal = true }, ref) => {
  const content = (
    <UiSelect.Content
      ref={ref}
      className={`${className} z-in-modal bg-white border border-gray-500 rounded shadow text-gray-900`}
    >
      <UiSelect.ScrollUpButton className="flex items-center justify-center h-6 transform rotate-180">
        <ArrowDownIcon className="w-3 h-3 stroke-current text-gray-700 arrowDown" />
      </UiSelect.ScrollUpButton>
      <UiSelect.Viewport>{children}</UiSelect.Viewport>
      <UiSelect.ScrollDownButton className="flex items-center justify-center h-6">
        <ArrowDownIcon className="w-3 h-3 stroke-current text-gray-700 arrowDown" />
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
        min-h-[3rem] flex items-center py-2 px-4 outline-none
        hover:bg-gray-100 cursor-pointer
        [&[data-state="checked"]]:font-bold
      `}
    >
      <UiSelect.ItemText>{children}</UiSelect.ItemText>
    </UiSelect.Item>
  );
});
Option.displayName = "Option";
