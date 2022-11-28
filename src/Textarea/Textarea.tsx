import { ComponentProps, forwardRef } from "react";
import { TextareaAutosize } from "@material-ui/core";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof TextareaAutosize> & {
    containerClassName?: string;
    error?: string;
    withError?: boolean;
  }
>(
  (
    { className = "", containerClassName = "", error, withError, ...props },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        <TextareaAutosize
          className={`${className} py-3 px-4 rounded border outline-none ${
            error
              ? "text-red-600 border-red-600"
              : "border-gray-500 focus:border-blue-500"
          }`}
          {...props}
          ref={ref}
        />
        {withError ? (
          <small className="font-bold mt-1 uppercase text-2xs text-gray-700">
            {error || "\u00A0"}
          </small>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
