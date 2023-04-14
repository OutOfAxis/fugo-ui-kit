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
          className={`${className} rounded border py-3 px-4 outline-none ${
            error
              ? "border-red-600 text-red-600"
              : "border-gray-500 focus:border-blue-500"
          }`}
          {...props}
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
