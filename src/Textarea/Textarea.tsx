import { ComponentProps } from "react";
import { TextareaAutosize } from "@material-ui/core";

export const Textarea = ({
  className,
  containerClassName,
  error,
  withError,
  ...props
}: ComponentProps<typeof TextareaAutosize> & {
  containerClassName?: string;
  error?: string;
  withError?: boolean;
}) => {
  return (
    <div className={containerClassName}>
      <TextareaAutosize
        {...props}
        className={`${className ?? ""} py-3 px-4 rounded border outline-none ${
          error
            ? "text-red-600 border-red-600"
            : "border-gray-500 focus:border-blue-500"
        }`}
      />
      {withError ? (
        <small className="font-bold mt-1 uppercase text-2xs text-gray-700">
          {error || "\u00A0"}
        </small>
      ) : null}
    </div>
  );
};
