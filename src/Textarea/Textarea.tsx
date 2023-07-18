import { ComponentProps, forwardRef, useContext } from "react";
import { TextareaAutosize } from "@material-ui/core";
import useForkRef from "@material-ui/core/utils/useForkRef";
import {
  InputGroupContext,
  InputGroupContextType,
} from "../Input/InputGroupContext";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof TextareaAutosize> & {
    containerClassName?: string;
    error?: string;
    withError?: boolean;
    onValueChange?: (newValue: string) => void;
  }
>(
  (
    {
      className = "",
      containerClassName = "",
      error,
      withError,
      onChange,
      onValueChange,
      disabled,
      ...props
    },
    outerRef
  ) => {
    const inputGroupContext = useContext<
      undefined | InputGroupContextType<string, HTMLTextAreaElement>
    >(InputGroupContext);
    const ref = useForkRef(outerRef, inputGroupContext?.inputRef ?? null);
    const isDisabled =
      disabled ?? inputGroupContext?.override?.disabled ?? false;
    return (
      <div className={containerClassName}>
        <TextareaAutosize
          id={inputGroupContext?.id}
          {...inputGroupContext?.input}
          className={`${className} rounded border px-4 py-3 text-gray-700 outline-none ${
            error ||
            Boolean(
              inputGroupContext?.meta.touched !== false &&
                inputGroupContext?.meta.error
            )
              ? "border-red-500"
              : "border-gray-500 focus:border-blue-500"
          } ${
            isDisabled ? "!border-gray-500 !bg-gray-100 !text-gray-500" : ""
          }`}
          {...props}
          {...inputGroupContext?.override}
          disabled={isDisabled}
          onChange={(event) => {
            inputGroupContext?.input?.onChange?.(event);
            onChange?.(event);
            onValueChange?.(event.target.value);
          }}
          ref={ref}
        />
        {withError ? (
          <small className="mt-1 text-sm text-red-500">
            {error || "\u00A0"}
          </small>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
