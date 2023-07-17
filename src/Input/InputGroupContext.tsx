import { createContext, InputHTMLAttributes, MutableRefObject } from "react";
import { FieldInputProps, FieldMetaState } from "react-final-form";

export type InputGroupContextType<
  FieldValue extends unknown = any,
  T extends HTMLElement = any
> = {
  input: Partial<FieldInputProps<FieldValue, T>>;
  meta: Partial<FieldMetaState<FieldValue>>;
  inputRef: MutableRefObject<T | null>;
  id: string;
  override: InputHTMLAttributes<T>;
  setOverride: (override: InputHTMLAttributes<T>) => void;
};

export const InputGroupContext = createContext<
  undefined | InputGroupContextType
>(undefined);
