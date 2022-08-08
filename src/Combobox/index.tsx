import React, { createContext, FunctionComponent, useContext } from "react";
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

const Combobox = ({
  children,
  label = "",
  placeholder = "",
  onChange,
  onSelect,
  value = "",
  disabled = false,
}: ComboboxProps) => (
  <PlaceholderContext.Provider
    value={value ? value?.toString() : placeholder || label}
  >
    {!!label && (
      <label className="block text-xs text-gray-700 font-semibold uppercase tracking-widest mb-2">
        {label}
      </label>
    )}
    <ReachCombobox onSelect={onSelect}>
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
);

export interface ComboboxListProps {
  children: React.ReactNode;
  portal?: boolean;
}

const ComboboxList: FunctionComponent<ComboboxListProps> = ({
  children,
  portal = true,
}) => {
  const placeholder = usePlaceholderContext();
  return (
    <ComboboxPopover
      aria-label="combobox-popover"
      portal={portal}
      className="w-full z-in-modal"
    >
      <div className="border-b xl:border-l border-gray-200 mx-4" />
      <ReachComboboxList aria-label="combobox-list">
        {placeholder && (
          <ComboboxOption value="default" aria-label="combobox-default">
            {placeholder}
          </ComboboxOption>
        )}
        {children}
      </ReachComboboxList>
    </ComboboxPopover>
  );
};

export interface OptionProps {
  children: React.ReactNode;
  value: string;
}

const Option: FunctionComponent<OptionProps> = ({ children, value }) => (
  <ComboboxOption aria-label="combobox-option" value={value.toString()}>
    {children}
  </ComboboxOption>
);

export { Combobox, ComboboxList, Option };
