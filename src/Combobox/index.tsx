import React, { createContext, forwardRef, useContext } from "react";
import {
  Combobox as ReachCombobox,
  ComboboxInput,
  ComboboxList as ReachComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "./index.module.css";

const PlaceholderContext = createContext("");

const usePlaceholderContext = (): string => {
  const context = useContext(PlaceholderContext);
  if (!context) {
    throw new Error(
      "Option compound components cannot be rendered outside the Option component"
    );
  }
  return context;
};

export interface ComboboxProps {
  children: React.ReactNode;
  label?: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string | number | null;
  disabled?: boolean;
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      children,
      label = "",
      placeholder = "",
      onChange,
      onSelect,
      value = "",
      disabled = false,
    },
    ref
  ) => (
    <PlaceholderContext.Provider
      value={value ? value?.toString() : placeholder || label}
    >
      {!!label && (
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-700">
          {label}
        </label>
      )}
      <ReachCombobox onSelect={onSelect} ref={ref}>
        <ComboboxInput
          disabled={disabled}
          aria-label="combobox-input"
          onChange={(event: any) => onChange(event.currentTarget.value)}
          value={value?.toString()}
          className="relative"
          placeholder={placeholder}
        />
        {children}
      </ReachCombobox>
    </PlaceholderContext.Provider>
  )
);
Combobox.displayName = "Combobox";

export interface ComboboxListProps {
  children: React.ReactNode;
  portal?: boolean;
}

export const ComboboxList = forwardRef<HTMLUListElement, ComboboxListProps>(
  ({ children, portal = true }, ref) => {
    const placeholder = usePlaceholderContext();
    return (
      <ComboboxPopover
        aria-label="combobox-popover"
        portal={portal}
        className="z-in-modal w-full"
      >
        <div className="mx-4 border-b border-gray-200 xl:border-l" />
        <ReachComboboxList aria-label="combobox-list" ref={ref}>
          {placeholder && (
            <ComboboxOption value="default" aria-label="combobox-default">
              {placeholder}
            </ComboboxOption>
          )}
          {children}
        </ReachComboboxList>
      </ComboboxPopover>
    );
  }
);
ComboboxList.displayName = "ComboboxList";

export interface OptionProps {
  children: React.ReactNode;
  value: string;
}

export const Option = forwardRef<HTMLLIElement, OptionProps>(
  ({ children, value }, ref) => (
    <ComboboxOption
      aria-label="combobox-option"
      value={value.toString()}
      ref={ref}
    >
      {children}
    </ComboboxOption>
  )
);
Option.displayName = "Option";
