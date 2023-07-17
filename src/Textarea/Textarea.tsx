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
      ...props
    },
    outerRef
  ) => {
    const inputGroupContext = useContext<
      undefined | InputGroupContextType<string, HTMLTextAreaElement>
    >(InputGroupContext);
    const ref = useForkRef(outerRef, inputGroupContext?.inputRef ?? null);
    return (
      <div className={containerClassName}>
        <TextareaAutosize
          id={inputGroupContext?.id}
          {...inputGroupContext?.input}
          className={`${className} rounded border px-4 py-3 outline-none ${
            error
              ? "border-red-600 text-red-600"
              : "border-gray-500 focus:border-blue-500"
          }`}
          {...props}
          {...inputGroupContext?.override}
          onChange={(event) => {
            inputGroupContext?.input?.onChange?.(event);
            onChange?.(event);
            onValueChange?.(event.target.value);
          }}
          ref={ref}
        />
        {withError ? (
          <small className="mt-1 text-2xs font-bold uppercase text-gray-700">
            {error || "\u00A0"}
          </small>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
